import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from './users.entity';
import { TagEntity } from './tags.entity';

@Entity()
export class PostEntity extends CommonEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  author: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.posts)
  @JoinTable()
  tags: TagEntity[];
}
