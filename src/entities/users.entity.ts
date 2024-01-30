import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { PostEntity } from './posts.entity';
import { RolesENUM } from './const/roles.const';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends CommonEntity {
  @IsEmail()
  @ApiProperty({
    description: '이메일',
    example: 'blog@gmail.com',
    required: true,
  })
  @Column({ unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 12)
  @ApiProperty({
    description: '닉네임',
    example: 'node',
    required: true,
  })
  @Column({ length: 12 })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Exclude({ toPlainOnly: true })
  @ApiProperty({
    description: '비밀번호',
    example: 'password123!',
    required: true,
  })
  @Column()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '프로필 사진',
    example: 'https://~~~',
  })
  @Column({ nullable: true })
  profileImg: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '회원 권한 - 관리자(ADMIN), 일반 유저(USER)',
    example: 'ADMIN',
  })
  @Column({ enum: Object.values(RolesENUM), default: RolesENUM.USER })
  role: RolesENUM;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];
}
