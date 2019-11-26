import dotenv from 'dotenv';
import Joi from '@hapi/joi';

import { ValidationError } from '@hapi/joi';
import { EnvConfig } from '../types/configType';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

let env: EnvConfig;

const OPTIONNAL = Joi.string().optional();
const REQUIRED = Joi.string().required();

const envSchema = Joi.object()
  .keys({
    JWT_PUBLICKEY: REQUIRED,
    JWT_PRIVATEKEY: REQUIRED,
    WEATHER_API_KEY: REQUIRED,
    STOCKS_API_KEY: REQUIRED,
    MONGODB_LOGIN: OPTIONNAL,
    MONGODB_PASSWORD: OPTIONNAL,
    MONGODB_URI: OPTIONNAL,
    MONGODB_LOGGER_URI: OPTIONNAL,
    REDIS_URI: OPTIONNAL
  })
  .unknown();

try {
  env = Joi.attempt(process.env, envSchema) as any;
} catch (e) {
  const { details } = e as ValidationError;
  const errors = details.map<string>(({ message }) => message);
  const errorMessage = errors.join('\n');
  throw new Error(`env: ${errorMessage}.`);
}

const envConfig = env;
export default envConfig;
