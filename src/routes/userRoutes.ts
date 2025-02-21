import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { UserService } from '../services/UserService';
import authenticateJWT from '../middleware/authenticateJwt';
import authorizeUser from '../middleware/authorizeUser';
import { UpdateUserDto } from '../dtos/UpdateUserDto';

const userRouter = Router();

const userService = new UserService();

const userController = new UserController(userService);

userRouter.patch(
  '/:uid',
  authenticateJWT,
  authorizeUser,
  validateRequestBody(UpdateUserDto),
  userController.updateUser
);

userRouter.delete(
  '/:uid',
  authenticateJWT,
  authorizeUser,
  userController.deleteUser
);

export default userRouter;
