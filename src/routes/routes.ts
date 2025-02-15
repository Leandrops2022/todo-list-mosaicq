import { Router } from 'express';
import greetingRoutes from './greetingRoute';
import tarefasRouter from './tarefasRoutes';

const appRouter = Router();

appRouter.use('/greetings', greetingRoutes);
appRouter.use('/tarefas', tarefasRouter);

export default appRouter;
