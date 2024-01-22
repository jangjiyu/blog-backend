import { PickType } from '@nestjs/swagger';
import { SignupEmailDto } from './signup-email.dto';

export class loginDto extends PickType(SignupEmailDto, [
  'email',
  'password',
] as const) {}
