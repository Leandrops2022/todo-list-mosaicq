import type { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedUser extends JwtPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}
