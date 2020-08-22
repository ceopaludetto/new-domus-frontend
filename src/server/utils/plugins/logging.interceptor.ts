import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import type { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public constructor(@InjectPinoLogger(LoggingInterceptor.name) private readonly logger: PinoLogger) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.logger.debug("Method(%s) took %sms", context.getHandler().name, Date.now() - now)));
  }
}
