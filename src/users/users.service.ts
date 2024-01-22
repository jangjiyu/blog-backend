import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async signupByEmail(body) {
    const isDupEmail = await this.userRepository.findUserByEmail(body.email);

    if (isDupEmail)
      throw new BadRequestException('이미 존재하는 이메일 정보입니다.');

    const saltOrRounds = parseInt(this.configService.get<string>('SALT'));

    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);

    this.userRepository.createUser(body.email, body.username, hashedPassword);
  }
}
