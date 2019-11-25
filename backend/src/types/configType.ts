export enum Env {
  development = 'development',
  production = 'production',
  test = 'test',
}

export interface EnvConfig {
  NODE_ENV: Env;
  JWT_PUBLICKEY: string;
  JWT_PRIVATEKEY: string;
  PORT?: string;
  MONGODB_LOGIN?: string;
  MONGODB_PASSWORD?: string;
  MONGODB_URI?: string;
  REDIS_URI?: string;
}

interface JWTConfig {
  publicKey: string;
  privateKey: string;
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

export interface ParamConfig {
  name: string;
  type: string;
}

export interface WidgetConfig {
  name: string;
  description: string;
  params: ParamConfig[];
  getter: (token: string, setting: any) => Promise<any>;
}

export interface Service {
  name: string;
  icon: string;
  needAuth: boolean;
  token: string;
  widgets: WidgetConfig[];
}

export interface Config {
  isDev: boolean;
  services: Service[];
  jwt: JWTConfig;
  express: ExpressConfig;
  mongoose: MongooseConfig;
  redis: RedisConfig;
  env: EnvConfig;
}
