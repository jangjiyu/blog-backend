import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { join } from 'path';
import { PROFILE_PUBLIC_IMAGE_PATH } from 'src/common/const/path.const';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly User: Repository<UserEntity>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.User.findOne({
      where: { email },
      select: ['id', 'email', 'username', 'profileImg', 'password'],
    });

    if (!user) return null;

    const compareResult = await bcrypt.compare(password, user.password);

    if (compareResult) {
      const { password, ...userWithoutPassword } = user;

      // TODO: class-transformer가 적용이 안 된다ㅠㅠ 왜 여기서만 안 되는 것인가
      if (userWithoutPassword.profileImg)
        userWithoutPassword.profileImg = join(
          PROFILE_PUBLIC_IMAGE_PATH,
          userWithoutPassword.profileImg,
        );

      return userWithoutPassword;
    }

    return null;
  }
}
