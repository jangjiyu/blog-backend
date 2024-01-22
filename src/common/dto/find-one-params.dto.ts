import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindOneParamsDto {
  @IsNumberString()
  @ApiProperty({
    description: 'params',
    example: '1',
    required: true,
  })
  id: number;
}
