import { NextFunction, Request, Response } from 'express';

export const error500Handler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
