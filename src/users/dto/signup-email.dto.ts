import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/entities/users.entity';

export class SignupByEmailDto extends PickType(UserEntity, [
  'email',
  'username',
  'password',
  'profileImg',
] as const) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호 확인',
    example: 'password123!',
    required: true,
  })
  confirmPassword: string;
}
