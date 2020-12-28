import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// authentication => 누가 자원을 요청하는지 확인하는 과정
// true & false 중 하나를 반환 true => req 진행 & false => req 멈춤

// autorization => 누가 어떤 일을 하기 전에 permission 가지고 있는지 확인 과정
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}
