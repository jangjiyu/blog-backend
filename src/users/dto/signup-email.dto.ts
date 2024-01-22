import { ApiProperty } from '@nestjs/swagger';

export class SignupEmailDto {
  @ApiProperty({
    description: '이메일',
    example: 'blog@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: '닉네임',
    example: 'node',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123!',
    required: true,
  })
  password: string;
}
