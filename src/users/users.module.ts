import { BadRequestException, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { UsersRepository } from './users.repository';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';
import { PROFILE_FOLDER_PATH } from 'src/common/const/path.const';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.register({
      limits: { fieldSize: 10000000 /* 10mb */ },
      fileFilter: (req, file, cb) => {
        /**
         * cb(에러, boolean)
         *
         * 첫 번째 파라미터에는 에러가 있을 경우 에러 정보 넣기
         * 두 번째 파라미터에는 파일을 받을지 말지 boolean값으로 넣기
         */

        // xxx.jpg -> .jpg
        const ext = extname(file.originalname);

        if (
          ext !== '.jpg' &&
          ext !== '.jpeg' &&
          ext !== '.png' &&
          ext !== '.JPG' &&
          ext !== '.JPEG' &&
          ext !== '.PNG'
        ) {
          return cb(
            new BadRequestException('jpg/jpeg/png 파일만 업로드 가능합니다'),
            false,
          );
        }

        return cb(null, true);
      },
      storage: multer.diskStorage({
        destination: function (req, res, cb) {
          // cb(err, 파일 저장할 폴더 위치)
          cb(null, PROFILE_FOLDER_PATH);
        },
        filename: function (req, file, cb) {
          // cb(err, 파일명)
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
