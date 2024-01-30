import { registerAs } from '@nestjs/config';

export default registerAs('Auth', () => ({
  salt: parseInt(process.env.SALT),
  sessionSecret: process.env.SESSION_SECRET,
}));
