import { Router } from 'express';
import taskRouter from './taskRoutes';
import userRouter from './userRoutes';
import authRouter from './authRoutes';

const appRouter = Router({ mergeParams: true });

appRouter.use('/auth', authRouter);

appRouter.use('/usuarios/:uid/tarefas', taskRouter);
appRouter.use('/usuarios', userRouter);

export default appRouter;
