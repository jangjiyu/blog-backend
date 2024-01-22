import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/users.entity';

export class deleteAccountDto extends PickType(UserEntity, [
  'password',
] as const) {}
