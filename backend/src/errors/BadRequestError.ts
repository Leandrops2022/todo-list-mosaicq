import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor() {
    super('Requisição incorreta', 400);
  }
}
