import { Response, NextFunction } from 'express';
import { AuthenticatedUser } from '../interfaces/AuthenticatedUser';
import { CustomRequest } from '../interfaces/CustomRequest';
const authorizeUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const { uid } = req.params;
  const user = req.user as AuthenticatedUser;

  if (!uid || parseInt(uid) != user.id) {
    res.status(403).json({
      message:
        'Sem permissão: você não tem permissão para acessar este recurso',
    });
    return;
  }

  next();
};

export default authorizeUser;
