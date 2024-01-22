import { PickType } from '@nestjs/swagger';
import { SignupEmailDto } from './signup-email.dto';

export class deleteAccountDto extends PickType(SignupEmailDto, [
  'password',
] as const) {}
