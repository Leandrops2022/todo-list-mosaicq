import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { User } from '../models/User';
import { LoginDto } from '../dtos/LoginDto';

const authRouter = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post(
  '/criar-usuario',
  validateRequestBody(User),
  authController.createUser
);
authRouter.post('/login', validateRequestBody(LoginDto), authController.login);

export default authRouter;
