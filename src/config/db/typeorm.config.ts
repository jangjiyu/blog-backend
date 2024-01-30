import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { UserEntity } from '../../entities/users.entity';
import { PostEntity } from 'src/entities/posts.entity';
import { TagEntity } from 'src/entities/tags.entity';
import databaseConfig from '../env/database.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private config: ConfigType<typeof databaseConfig>,
  ) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.pgHost,
      port: this.config.pgPort,
      username: this.config.pgUsername,
      password: this.config.pgPassword,
      database: this.config.pgDatabase,
      entities: [UserEntity, PostEntity, TagEntity],
      synchronize: true,
      logging: true,
    };
  }
}
