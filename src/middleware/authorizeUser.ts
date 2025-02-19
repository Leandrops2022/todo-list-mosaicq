import { Response, NextFunction } from 'express';
import { AuthenticatedUser } from '../interfaces/AuthenticatedUser';
import { CustomRequest } from '../interfaces/CustomRequest';
const authorizeUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const { uid } = req.params;
  console.log(uid);
  const user = req.user as AuthenticatedUser;

  if (!uid || parseInt(uid) !== user.id) {
    res.status(403).json({
      message:
        'Sem permissão: você não tem permissão para acessar as tarefas desse usuário',
    });
    return;
  }

  next();
};

export default authorizeUser;
