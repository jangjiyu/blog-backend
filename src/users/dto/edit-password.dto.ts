import { ApiProperty, PickType } from '@nestjs/swagger';
import { SignupByEmailDto } from './signup-email.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditPasswordDto extends PickType(SignupByEmailDto, [
  'password',
  'confirmPassword',
] as const) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '기존 비밀번호',
    example: 'old-password99',
    required: true,
  })
  currentPassword: string;
}
