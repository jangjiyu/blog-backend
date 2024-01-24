import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly User: Repository<UserEntity>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.User.findOne({ where: { email } });

    if (!user) return null;

    const compareResult = await bcrypt.compare(password, user.password);

    if (compareResult) {
      const { password, isActive, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  }
}
