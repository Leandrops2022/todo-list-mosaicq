import { Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { UserService } from '../services/UserService';
import { CustomRequest } from '../interfaces/CustomRequest';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  updateUser = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { uid } = req.params;
    const updateDto = req.body.dto;
    res
      .status(200)
      .json(await this.userService.updateUser(parseInt(uid), updateDto));
  });

  deleteUser = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { uid } = req.params;

    res.status(200).json(await this.userService.deleteUser(parseInt(uid)));
  });
}
