import { PickType } from '@nestjs/swagger';
import { PostEntity } from 'src/entities/posts.entity';

export class createPostDto extends PickType(PostEntity, [
  'title',
  'content',
] as const) {}
