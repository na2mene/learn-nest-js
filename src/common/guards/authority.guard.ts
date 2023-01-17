import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

const API_KEY = 'secret';

// ヘッダーの Authorization の値を検証する単純な関数
function validateRequest(request: Request): boolean {
  return request.header('Authorization') === API_KEY;
}

@Injectable()
export class AuthorityGuard implements CanActivate {
  // NOTE: trueの時、リクエストは処理され、falseの時、Nestはリクエストを拒否する。
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
