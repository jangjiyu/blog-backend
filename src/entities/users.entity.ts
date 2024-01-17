import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
