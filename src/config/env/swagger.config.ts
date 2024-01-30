import { registerAs } from '@nestjs/config';

export default registerAs('Swagger', () => ({
  user: process.env.SWAGGER_API_USER,
  password: process.env.SWAGGER_API_PASSWORD,
}));
