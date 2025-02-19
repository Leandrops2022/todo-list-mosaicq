import { BaseError } from './BaseError';

class InvalidCredentialsError extends BaseError {
  constructor() {
    super('Credenciais inválidas', 401);
  }
}

export default InvalidCredentialsError;
