import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { UserService } from '../services/UserService';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import authenticateJWT from '../middleware/authenticateJwt';
import authorizeUser from '../middleware/authorizeUser';

const userRouter = Router();

const userService = new UserService();

const userController = new UserController(userService);

userRouter.use(authenticateJWT, authorizeUser);

userRouter.patch(
  '/:uid',
  validateRequestBody(UpdateUserDto),
  userController.updateUser
);

userRouter.delete('/:uid', userController.deleteUser);

export default userRouter;
