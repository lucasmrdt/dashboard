export enum Env {
  development = 'development',
  production = 'production',
  test = 'test',
}

export interface EnvConfig {
  NODE_ENV: Env;
  JWT_PUBKEY: string;
  JWT_AUDIENCE: string;
  PORT?: string;
  MONGODB_LOGIN?: string;
  MONGODB_PASSWORD?: string;
  MONGODB_URI?: string;
  REDIS_URI?: string;
}

interface JWTConfig {
  publicKey: string;
}

interface ExpressConfig {
  port: string;
}

interface MongooseConfig {
  uri: string;
}

interface RedisConfig {
  uri: string;
}

interface ParamConfig {
  name: string;
  type: string;
}

interface WidgetConfig {
  name: string;
  description: string;
  params: ParamConfig[];
}

interface ServiceConfig {
  name: string;
  widgets: WidgetConfig[];
}

export interface Config {
  isDev: boolean;
  sevices: ServiceConfig[];
  jwt: JWTConfig;
  express: ExpressConfig;
  mongoose: MongooseConfig;
  redis: RedisConfig;
  env: EnvConfig;
}
