import { PickType } from '@nestjs/swagger';
import { SignupByEmailDto } from './signup-email.dto';

export class DeleteAccountDto extends PickType(SignupByEmailDto, [
  'password',
] as const) {}
