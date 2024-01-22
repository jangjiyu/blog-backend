import { PickType } from '@nestjs/swagger';
import { PostEntity } from 'src/entities/posts.entity';

export class editPostDto extends PickType(PostEntity, [
  'title',
  'content',
] as const) {}
