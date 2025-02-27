import express from 'express';
import appRouter from './routes/routes';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());

app.use('/api', appRouter);
app.use(errorHandler);

export default app;
