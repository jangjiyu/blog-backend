import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';

export class SignupByEmailDto extends PickType(UserEntity, [
  'email',
  'username',
  'password',
] as const) {}
