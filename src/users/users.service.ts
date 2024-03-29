import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { ConfigType } from '@nestjs/config';
import AuthConfig from 'src/config/env/auth.config';

@Injectable()
export class UsersService {
  constructor(
    @Inject(AuthConfig.KEY)
    private authConfig: ConfigType<typeof AuthConfig>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signupByEmail(body, filename?) {
    if (body.password !== body.confirmPassword)
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인 값이 일치하지 않습니다.',
      );

    const isDupEmail = await this.usersRepository.findUserByEmail(body.email);

    if (isDupEmail)
      throw new BadRequestException('이미 존재하는 이메일 정보입니다.');

    const saltOrRounds = this.authConfig.salt;

    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);

    const user = {
      email: body.email,
      password: hashedPassword,
      username: body.username,
      profileImg: filename,
    };

    this.usersRepository.createOrUpdateUser(user);
  }

  editProfile(user, body) {
    if (body.username) user.username = body.username;

    this.usersRepository.createOrUpdateUser(user);

    return user;
  }

  editProfileImg(user, filename) {
    user.profileImg = filename;

    this.usersRepository.createOrUpdateUser(user);

    return user;
  }

  async editPassword(userId, body) {
    const user = await this.usersRepository.findUserById(userId);

    const hashCompareResult = await bcrypt.compare(
      body.currentPassword,
      user.password,
    );

    if (!hashCompareResult)
      throw new BadRequestException('현재 비밀번호가 올바르지 않습니다.');

    if (body.password !== body.confirmPassword)
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인 값이 일치하지 않습니다.',
      );

    const saltOrRounds = this.authConfig.salt;

    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);

    user.password = hashedPassword;

    this.usersRepository.createOrUpdateUser(user);
  }
}
