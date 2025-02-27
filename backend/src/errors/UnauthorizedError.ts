import { BaseError } from './BaseError';

class UnauthorizedError extends BaseError {
  constructor() {
    super(
      'Credenciais inválidas. Você não tem permissão para acessar este recurso',
      401
    );
  }
}

export default UnauthorizedError;
