import { Catch, ExceptionFilter } from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';

@Catch()
export class YourCatchAllExceptionFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  catch(exception, host): void {
    // your implementation here
    console.log(exception);
    console.log(host);
  }
}
