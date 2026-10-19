import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: any, res: any, next: () => void) {

    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    this.logger.log(
      `Incoming Request: ${method} ${originalUrl} - IP: ${ip} - User-Agent: ${userAgent}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `Outgoing Response: ${method} ${originalUrl} - ${statusCode} - ${contentLength || 0} b -  ${responseTime}ms`,
      );
      if (statusCode >= 400) {
        this.logger.error(
          `Error Response: ${method} ${originalUrl} - ${statusCode} -  ${responseTime}ms`,
        );
      }
    })

    res.on('error', (error: Error) => {
      this.logger.error(
        `Response Error: ${method} ${originalUrl} -  ${error.message}`,
      );
    });


    res.on('timeout', () => {
      this.logger.warn(
        `Request Timeout: ${method} ${originalUrl} -  ${Date.now() - startTime}ms`,
      );
    });


    next();
  }
}
