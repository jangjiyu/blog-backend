import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly User: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email) {
    return await this.User.findOne({ where: { email } });
  }

  async createOrUpdateUser(user) {
    await this.User.save(user);
  }
}
