import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { PostEntity } from './posts.entity';

@Entity()
export class TagEntity extends CommonEntity {
  @Column()
  name: string;

  @Column()
  content: string;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts: PostEntity[];
}
