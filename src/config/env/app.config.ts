import { registerAs } from '@nestjs/config';

export default registerAs('App', () => ({
  mode: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
}));
