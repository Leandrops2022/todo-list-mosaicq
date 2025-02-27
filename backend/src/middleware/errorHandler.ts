import { NextFunction, Request, Response } from 'express';
import { logErrorToFile } from '../utils/logger';

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.status || 500;

  logErrorToFile(err, req);

  res
    .status(statusCode)
    .json({ error: err.message || 'Internal server error' });
};
