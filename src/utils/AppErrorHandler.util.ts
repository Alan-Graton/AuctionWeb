export interface AppError {
  error: string;
  message: string;
  statusCode: number;
}

export class AppErrorHandler {
  public error;
  public message;
  public statusCode;

  constructor({ error, message, statusCode }: AppError) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
  }
}
