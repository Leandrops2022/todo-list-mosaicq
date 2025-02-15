import express from 'express';
import appRouter from './routes/routes';

const app = express();

app.use(express.json());

app.use('/api', appRouter);

export default app;
