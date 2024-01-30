import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { LoginByEmailDto } from 'src/users/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string, done: CallableFunction) {
    const loginByEmailDto = plainToClass(LoginByEmailDto, { email, password });
    const errors = await validate(loginByEmailDto);

    if (errors.length > 0) throw new BadRequestException('유효성 검사 실패');

    const user = await this.authService.validateUser(email, password);

    if (!user) throw new UnauthorizedException();

    return done(null, user);
  }
}
