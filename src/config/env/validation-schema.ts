import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.string().required(),
  SALT: Joi.string().required(),
  SESSION_SECRET: Joi.string().required(),
  DB_PG_USERNAME: Joi.string().required(),
  DB_PG_PASSWORD: Joi.string().required(),
  DB_PG_HOST: Joi.string().required(),
  DB_PG_PORT: Joi.string().required(),
  DB_PG_DATABASE: Joi.string().required(),
  DB_REDIS_HOST: Joi.string().required(),
  DB_REDIS_PORT: Joi.string().required(),
  SWAGGER_API_USER: Joi.string().required(),
  SWAGGER_API_PASSWORD: Joi.string().required(),
});
