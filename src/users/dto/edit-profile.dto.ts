import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditProfileDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '닉네임',
    example: 'nodde',
    required: false,
  })
  username?: string;
}
