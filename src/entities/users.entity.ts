import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { PostEntity } from './posts.entity';
import { RolesENUM } from './const/roles.const';

@Entity()
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  email: string;

  @Column({ length: 12 })
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileImg: string;

  @Column({ enum: Object.values(RolesENUM), default: RolesENUM.USER })
  role: RolesENUM;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];
}
