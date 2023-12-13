import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  //인젝터블한 클래스가 아니기 때문에 직접 넣어야함
  private readonly logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `[${method}]${originalUrl}:${statusCode} - ${responseTime}ms`,
      );
    });
    next();
  }
}
