import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/CustomRequest';
import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from '../interfaces/AuthenticatedUser';
import getEnvVariables from '../utils/getEnvVariables';

const secret = getEnvVariables().JWT_SECRET;

const authenticateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        res.status(401).json({
          message: 'Não autorizado. Token inválido ou expirado.',
        });
        return;
      }
      req.user = decoded as AuthenticatedUser;
      next();
    });
  } else {
    res.status(401).json({
      message:
        'Não autorizado. Você precisa efetuar login para acessar esse recurso',
    });
  }
};

export default authenticateJWT;
