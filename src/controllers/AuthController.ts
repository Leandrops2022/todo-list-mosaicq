import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { AuthService } from '../services/AuthService';
import { plainToInstance } from 'class-transformer';
import { User } from '../models/User';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = plainToInstance(User, req.body);
    const result = await this.authService.createUser(validatedData);
    res.status(201).json(result);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.authService.login(email, password);
    res.status(200).json(result);
  });
}
