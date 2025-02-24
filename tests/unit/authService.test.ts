import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../../src/services/AuthService';
import { UserRepository } from '../../src/repositories/UserRepository';
import UnauthorizedError from '../../src/errors/UnauthorizedError';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { LoginDto } from '../../src/dtos/LoginDto';
import { plainToInstance } from 'class-transformer';

vi.mock('../../src/repositories/UserRepository');
vi.mock('bcrypt', () => ({
  hash: vi.fn(),
  compare: vi.fn(),
}));
vi.mock('jsonwebtoken', () => ({
  sign: vi.fn(),
}));

const mockUser = {
  id: 1,
  name: 'TestUser',
  email: 'test@example.com',
  password: 'hashedpassword',
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should create a user and return response data with token', async () => {
    const hashedPassword = 'hashedpassword';
    hash.mockResolvedValue(hashedPassword);
    UserRepository.save.mockResolvedValue({
      ...mockUser,
      password: hashedPassword,
    });
    sign.mockReturnValue('fakeToken');

    const result = await authService.createUser({
      email: mockUser.email,
      password: 'plaintext',
      name: 'Simple test',
    });

    console.log(result);

    expect(hash).toHaveBeenCalledWith('plaintext', 10);
    expect(UserRepository.save).toHaveBeenCalled();
    expect(result).toEqual({
      data: { email: mockUser.email, id: mockUser.id, name: mockUser.name },
      message: 'Usuário criado com sucesso!',
      token: 'fakeToken',
    });
  });

  it('should log in a user with valid credentials', async () => {
    UserRepository.findOne.mockResolvedValue(mockUser);
    compare.mockResolvedValue(true);
    sign.mockReturnValue('fakeToken');

    const loginDto: LoginDto = plainToInstance(LoginDto, { ...mockUser });

    const result = await authService.login(loginDto);

    expect(UserRepository.findOne).toHaveBeenCalledWith({
      select: {
        email: true,
        id: true,
        name: true,
      },
      where: { email: loginDto.email },
    });
    expect(compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
    expect(result).toEqual({
      message: 'Logado com sucesso!',
      data: mockUser,
      token: 'fakeToken',
    });
  });

  it('should throw UnauthorizedError if user is not found', async () => {
    UserRepository.findOne.mockResolvedValue(null);
    await expect(
      authService.login(mockUser.email, 'plaintext')
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should throw UnauthorizedErrorr if password is incorrect', async () => {
    UserRepository.findOne.mockResolvedValue(mockUser);
    compare.mockResolvedValue(false);
    await expect(
      authService.login(mockUser.email, 'wrongpassword')
    ).rejects.toThrow(UnauthorizedError);
  });
});
