import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { UserController } from '../../src/controllers/UserController';
import { UserService } from '../../src/services/UserService';
import { errorHandler } from '../../src/middleware/errorHandler';
import { NotFoundError } from '../../src/errors/NotFoundError';

describe('UserController Integration Tests', () => {
  let app: Express;
  let userService: UserService;
  let userController: UserController;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    userService = {
      updateUser: vi.fn(),
      deleteUser: vi.fn(),
    } as unknown as UserService;

    userController = new UserController(userService);

    app.patch('/api/usuarios/:uid', userController.updateUser);
    app.delete('/api/usuarios/:uid', userController.deleteUser);

    app.use(errorHandler);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('PATCH /api/usuarios/:uid', () => {
    it('should update a user and return success', async () => {
      const userId = 1;
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const serviceResponse = {
        message: 'Dados atualizados com sucesso',
        data: true,
      };

      vi.mocked(userService.updateUser).mockResolvedValue(serviceResponse);

      const response = await request(app)
        .patch(`/api/usuarios/${userId}`)
        .send({ dto: updateData });

      expect(response.status).toBe(200);
      expect(userService.updateUser).toHaveBeenCalledWith(userId, updateData);
      expect(response.body).toEqual(serviceResponse);
    });

    it('should return error if user not found', async () => {
      const userId = 1;
      const updateData = { name: 'Updated Name' };
      const errorMessage = 'Usuário não encontrado';

      vi.mocked(userService.updateUser).mockRejectedValue(
        new NotFoundError(errorMessage)
      );

      const response = await request(app)
        .patch(`/api/usuarios/${userId}`)
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', errorMessage);
    });
  });

  describe('DELETE /api/usuarios/:uid', () => {
    it('should delete a user and return success', async () => {
      const userId = 1;
      const serviceResponse = {
        message: 'Usuário deletado com sucesso',
        data: true,
      };

      vi.mocked(userService.deleteUser).mockResolvedValue(serviceResponse);

      const response = await request(app).delete(`/api/usuarios/${userId}`);

      expect(response.status).toBe(200);
      expect(userService.deleteUser).toHaveBeenCalledWith(userId);
      expect(response.body).toEqual(serviceResponse);
    });

    it('should return error if user not found on delete', async () => {
      const userId = 1;
      const errorMessage = 'Usuário não encontrado';

      vi.mocked(userService.deleteUser).mockRejectedValue(
        new NotFoundError(errorMessage)
      );

      const response = await request(app).delete(`/api/usuarios/${userId}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', errorMessage);
    });
  });
});
