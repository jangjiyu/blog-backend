import { ApiProperty } from '@nestjs/swagger';

export class createPostDto {
  @ApiProperty({
    description: '제목',
    example: '오늘의 먹부림',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: '내용',
    example: '오늘 아침은 카레로 시작! 점심도 카레! 저녁도 카레! 내일도 카레!',
    required: true,
  })
  content: string;
}
