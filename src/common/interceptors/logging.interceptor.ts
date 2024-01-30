// https://docs.nestjs.com/interceptors
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    /**
     * 요청이 들어올 때 타임스탬프 찍기
     * [REQ] { 요청 path } { 요청 시간 }
     *
     * 요청이 끝날 때 (응답이 나갈 때) 다시 타임스탬프 찍기
     * [RES] { 요청 path } { 응답 시간 } { 얼마나 시간이 걸렸는지 ms }
     */
    const now = new Date();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const path = req.originalUrl;
    const method = req.method;

    console.log(`[REQ] - [${method}] - ${path} - ${now.toLocaleString('kr')}`);

    // return next.handle()을 실행하는 순간 라우트의 로직이 전부 실행되고 응답이 observable로 반환된다
    // observable은 rxjs에서 제공하는 타입으로 일종의 스트림 같은 것 -> 응답을 받아서 자유롭게 변형 가능
    // pipe()로 응답값 컨트롤 - tap()으로 모니터링(변형은 못함), map()으로 변형 (pipe 안은 순서대로 실행됨)
    // rxjs의 operator 참고 https://rxjs.dev/guide/operators
    return next.handle().pipe(
      map((observable) => {
        return { message: 'ok', response: observable };
      }),
      tap(() =>
        console.log(
          `[RES] - [${method}] - ${path} - ${now.toLocaleString(
            'kr',
          )} - status: ${res.statusCode} - ${
            new Date().getMilliseconds() - now.getMilliseconds()
          }ms`,
        ),
      ),
    );
  }
}
