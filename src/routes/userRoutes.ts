import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import authenticateJWT from '../middleware/authenticateJwt';
import authorizeUser from '../middleware/authorizeUser';

const userRouter = Router();

const userService = new UserService();

const userController = new UserController(userService);

userRouter.put(
  '/:id',
  authenticateJWT,
  authorizeUser,
  validateRequestBody(User),
  userController.updateUser
);

userRouter.delete(
  '/:id',
  authenticateJWT,
  authorizeUser,
  userController.deleteUser
);

export default userRouter;
