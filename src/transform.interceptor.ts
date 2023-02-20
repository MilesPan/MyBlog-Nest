import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
export class TransformInterceptor implements NestInterceptor {
  // 拦截，让返回的数据都包裹到data中
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        // 如果返回数据有meta(分页)，就直接返回，否则包裹到data里
        return data?.meta ? data : { data };
      }),
    );
  }
}
