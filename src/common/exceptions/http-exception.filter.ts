// https://docs.nestjs.com/exception-filters
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException) // HttpException에 해당하는 거 모두 catch해옴
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number }
      | { error: string; statusCode: 400; message: string[] }
      | { error: string; statusCode: 404; message: string[] };

    console.log(err, '// type:', typeof err);

    let message = null;
    if (typeof err !== 'string' && err) message = err.message;
    else message = err;

    // 로그 파일을 생성하거나
    // 에러 모니터링 시스템에 api 콜하기 등 가능

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toLocaleString('kr'),
      path: request.url,
    });
  }
}
