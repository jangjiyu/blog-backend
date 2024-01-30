import { PickType } from '@nestjs/swagger';
import { SignupByEmailDto } from './signup-email.dto';

export class LoginByEmailDto extends PickType(SignupByEmailDto, [
  'email',
  'password',
] as const) {}
