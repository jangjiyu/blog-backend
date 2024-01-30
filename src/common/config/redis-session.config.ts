import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { Redis } from 'ioredis';
import * as passport from 'passport';
import { EnvKeys } from '../const/env-keys.const';

export const redisSessionConfig = (app: INestApplication<any>): void => {
  const configService = app.get<ConfigService>(ConfigService);

  // 레디스 url 정보
  const host = configService.get(EnvKeys.ENV_DB_REDIS_DOCKER_HOST);
  const port = configService.get(EnvKeys.ENV_DB_REDIS_DOCKER_PORT);

  // 레디스 설정
  const client = new Redis({
    host,
    port,
  });

  client.on('error', (err) =>
    console.log('Could not establish a connection with redis. ' + err),
  );
  client.on('connect', () => console.log('Connected to redis successfully'));

  // 세션 설정
  app.use(
    session({
      secret: configService.get(EnvKeys.ENV_SESSION_SECRET),
      saveUninitialized: false,
      resave: false,
      store: new (RedisStore as any)({
        client: client,
        ttl: 30,
      }),
      cookie: {
        httpOnly: true,
        // secure: true,
        secure: false,
        maxAge: 30000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
