import { PickType } from '@nestjs/swagger';
import { createPostDto } from './create-post.dto';

export class editPostDto extends PickType(createPostDto, [
  'title',
  'content',
] as const) {}
