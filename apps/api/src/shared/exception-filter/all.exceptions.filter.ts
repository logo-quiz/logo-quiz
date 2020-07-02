import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: Logger) {
    this.logger.setContext('Router');
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    const req: Request = ctx.getRequest();
    const status = exception.getStatus ? exception.getStatus() : 500;

    const response = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: exception.message || exception,
    };

    const message = `[Request] [${req.method}] [${req.originalUrl}] - [${status}]`;
    this.logger.error(message, exception.message || exception);

    res.status(status).json(response);
  }
}
