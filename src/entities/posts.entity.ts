import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from './users.entity';
import { TagEntity } from './tags.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PostEntity extends CommonEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '제목',
    example: '오늘의 먹부림',
    required: true,
  })
  @Column()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '내용',
    example: '오늘 아침은 카레로 시작! 점심도 카레! 저녁도 카레! 내일도 카레!',
    required: true,
  })
  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    nullable: false, // 작성자가 없는 포스트가 있으면 안 되므로 NN
  })
  author: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.posts)
  @JoinTable()
  tags: TagEntity[];
}
