import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { AuthController } from '../../src/controllers/AuthController';
import { AuthService } from '../../src/services/AuthService';
import { errorHandler } from '../../src/middleware/errorHandler';

describe('AuthController Integration Tests', () => {
  let app: Express;
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    authService = {
      createUser: vi.fn(),
      login: vi.fn(),
    } as unknown as AuthService;

    authController = new AuthController(authService);

    app.post('/api/auth/criar-usuario', authController.createUser);
    app.post('/api/auth/login', authController.login);

    app.use(errorHandler);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/auth/criar-usuario', () => {
    it('should create a new user and return success', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'secret123',
      };

      const serviceResponse = {
        message: 'User created successfully!',
        data: { id: 1, ...createUserDto },
        token: 'fake-jwt-token',
      };

      vi.mocked(authService.createUser).mockResolvedValue(serviceResponse);

      const response = await request(app)
        .post('/api/auth/criar-usuario')
        .send({ dto: createUserDto });

      expect(response.status).toBe(201);
      expect(authService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(response.body).toEqual(serviceResponse);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in the user and return success', async () => {
      const loginDto = {
        email: 'john@example.com',
        password: 'secret123',
      };

      const serviceResponse = {
        message: 'Logado com sucesso!',
        data: { id: 1, name: 'John Doe', email: 'john@example.com' },
        token: 'fake-jwt-token',
      };

      vi.mocked(authService.login).mockResolvedValue(serviceResponse);

      const response = await request(app)
        .post('/api/auth/login')
        .send({ dto: loginDto });

      expect(response.status).toBe(200);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(response.body).toEqual(serviceResponse);
    });
  });
});
