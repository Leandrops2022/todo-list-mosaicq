import { Router } from 'express';
import taskRouter from './taskRoutes';
import userRouter from './userRoutes';
import authenticateJWT from '../middleware/authenticateJwt';
import authorizeUser from '../middleware/authorizeUser';
import authRouter from './authRoutes';

const appRouter = Router({ mergeParams: true });

appRouter.use('/auth', authRouter);

appRouter.use('/usuarios', userRouter);

appRouter.use(
  '/usuarios/:uid/tarefas',
  authenticateJWT,
  authorizeUser,
  taskRouter
);

export default appRouter;
