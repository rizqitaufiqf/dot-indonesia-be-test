import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP-Request');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, body } = req;
    const start = Date.now();

    // Log request details
    this.logger.log(`[${method}] ${url} - Body: ${JSON.stringify(body)}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;

      // Log response details
      this.logger.log(
        `[${method}] ${url} - Status: ${statusCode} - Duration: ${duration}ms`,
      );
    });

    next();
  }
}
