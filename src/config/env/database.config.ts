import { registerAs } from '@nestjs/config';

export default registerAs('Database', () => ({
  pgHost: process.env.DB_PG_HOST,
  pgPort: parseInt(process.env.DB_PG_PORT),
  pgUsername: process.env.DB_PG_USERNAME,
  pgPassword: process.env.DB_PG_PASSWORD,
  pgDatabase: process.env.DB_PG_DATABASE,
  redisHost: process.env.DB_REDIS_HOST,
  redisPort: parseInt(process.env.DB_REDIS_PORT),
}));
