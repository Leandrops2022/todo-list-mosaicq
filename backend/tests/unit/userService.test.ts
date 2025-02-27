import { describe, it, expect, vi, afterEach } from 'vitest';
import { UserService } from '../../src/services/UserService';
import { UserRepository } from '../../src/repositories/UserRepository';
import { NotFoundError } from '../../src/errors/NotFoundError';

describe('UserService', () => {
  const userService = new UserService();

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const userId = 1;
      const updateData = { name: 'Updated Name' };

      UserRepository.update = vi.fn().mockResolvedValue({ affected: 1 });

      const result = await userService.updateUser(userId, updateData);

      expect(result).toEqual({
        message: 'Dados atualizados com sucesso',
        data: true,
      });
      expect(UserRepository.update).toHaveBeenCalledWith(userId, updateData);
    });

    it('should throw NotFoundError if user does not exist', async () => {
      const userId = 1;
      const updateData = { name: 'Updated Name' };

      UserRepository.update = vi.fn().mockResolvedValue({ affected: 0 });

      await expect(userService.updateUser(userId, updateData)).rejects.toThrow(
        NotFoundError
      );
      await expect(userService.updateUser(userId, updateData)).rejects.toThrow(
        'Usuário não encontrado'
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const userId = 1;

      UserRepository.delete = vi.fn().mockResolvedValue({ affected: 1 });

      const result = await userService.deleteUser(userId);

      expect(UserRepository.delete).toHaveBeenCalledWith(userId);

      expect(result).toEqual({
        message: 'Usuário deletado com sucesso',
        data: true,
      });
    });

    it('should throw NotFoundError if user does not exist', async () => {
      const userId = 1;

      UserRepository.delete = vi.fn().mockResolvedValue({ affected: 0 });

      await expect(userService.deleteUser(userId)).rejects.toThrow(
        NotFoundError
      );
      await expect(userService.deleteUser(userId)).rejects.toThrow(
        'Usuário não encontrado'
      );
    });
  });
});
