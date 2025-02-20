import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const { dto } = req.body;
    const result = await this.authService.createUser(dto);
    res.status(201).json(result);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { dto } = req.body;
    const result = await this.authService.login(dto);
    res.status(200).json(result);
  });
}
