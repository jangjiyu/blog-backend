import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly User: Repository<UserEntity>,
  ) {}

  async findUserById(id) {
    return this.User.findOneOrFail({ where: { id } });
  }

  async findUserByEmail(email) {
    return this.User.findOne({ where: { email } });
  }

  async createOrUpdateUser(user) {
    return this.User.save(user);
  }
}
