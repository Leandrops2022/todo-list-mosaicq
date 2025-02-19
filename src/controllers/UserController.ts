import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { UserService } from '../services/UserService';
import { plainToInstance } from 'class-transformer';
import { User } from '../models/User';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = plainToInstance(User, req.body);

    res
      .status(200)
      .json(await this.userService.updateUser(parseInt(id), updateData));
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    res.status(200).json(await this.userService.deleteUser(parseInt(id)));
  });
}
