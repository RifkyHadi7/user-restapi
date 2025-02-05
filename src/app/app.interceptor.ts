import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Request received');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`Response sent after ${Date.now() - now}ms`)),
    );
  }
}


