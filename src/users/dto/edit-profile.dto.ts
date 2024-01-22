import { PickType } from '@nestjs/swagger';
import { SignupEmailDto } from './signup-email.dto';

export class editProfileDto extends PickType(SignupEmailDto, [
  'username',
  'password',
] as const) {}
