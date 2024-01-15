import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/users.entity';
import { EnvKeys } from 'src/common/const/env-keys.const';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>(EnvKeys.ENV_DB_PG_HOST),
      port: this.configService.get<number>(EnvKeys.ENV_DB_PG_PORT),
      username: this.configService.get<string>(EnvKeys.ENV_DB_PG_USERNAME),
      password: this.configService.get<string>(EnvKeys.ENV_DB_PG_PASSWORD),
      database: this.configService.get<string>(EnvKeys.ENV_DB_PG_DATABASE),
      entities: [User],
      synchronize: true,
    };
  }
}
