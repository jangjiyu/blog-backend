import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UserEntity) private readonly User: Repository<UserEntity>,
  ) {
    super();
  }

  serializeUser(user: any, done: CallableFunction) {
    done(null, user.id); // user.id 세션에 저장
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.User.findOneOrFail({
      where: { id: parseInt(userId) },
      select: ['id', 'email', 'username', 'profileImg'],
    }).then((user) => {
      console.log('user: ', user);
      done(null, user);
    });
  }
}
