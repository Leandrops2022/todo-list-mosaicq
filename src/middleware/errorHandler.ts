import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.status || 500;
  //implementar o logger aqui
  res
    .status(statusCode)
    .json({ error: err.message || 'Internal server error' });
};
