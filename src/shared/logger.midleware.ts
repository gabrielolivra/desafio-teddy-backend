import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;
    console.log(`[Request] ${method} ${originalUrl}`);
    console.log('Body:', JSON.stringify(body));

    next();
  }
}
