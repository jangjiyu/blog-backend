import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';

export class editProfileDto extends PickType(UserEntity, [
  'username',
  'password',
] as const) {}
