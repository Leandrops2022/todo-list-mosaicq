export class BaseError extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    super();
    this.message = message || 'Erro interno do servidor';
    this.status = status || 500;
  }
}
