import {
  CreateDateColumn,
  // DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber } from 'class-validator';
// import { Exclude } from 'class-transformer';

export abstract class CommonEntity {
  @IsNumber()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  // DB SQL QUERY : set time zone 'Asia/Seoul'; set time zone 'UTC'; show timezone;
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // @Exclude()
  // @DeleteDateColumn({ type: 'timestamptz' })
  // deletedAt?: Date | null; // soft delete를 위해 nullable
}
