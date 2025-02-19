import { Request } from 'express';
import { AuthenticatedUser } from './AuthenticatedUser';

export interface CustomRequest extends Request {
  user?: AuthenticatedUser;
}
