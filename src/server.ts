import express from 'express';
import appRouter from './routes/routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/api', appRouter);
app.use(errorHandler);

export default app;
