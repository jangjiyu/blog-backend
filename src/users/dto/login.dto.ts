import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';

export class loginDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}
