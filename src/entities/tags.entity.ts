import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { PostEntity } from './posts.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TagEntity extends CommonEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'tag 이름',
    example: 'nestjs',
    required: true,
  })
  @Column()
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts: PostEntity[];
}
