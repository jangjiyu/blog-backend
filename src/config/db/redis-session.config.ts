import { INestApplication } from '@nestjs/common';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { Redis } from 'ioredis';
import * as passport from 'passport';

export const redisSessionConfig = (app: INestApplication<any>): void => {
  // 레디스 url 정보
  const host = process.env.DB_REDIS_HOST;
  const port = parseInt(process.env.DB_REDIS_PORT);
  // 세션 secret
  const sessionSecret = process.env.SESSION_SECRET;

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
      secret: sessionSecret,
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
