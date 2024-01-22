import { IsNumberString } from 'class-validator';

export class paramsDto {
  @IsNumberString()
  id: number;
}
