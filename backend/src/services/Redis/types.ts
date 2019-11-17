import { Request } from 'express';

export interface RedisProvider {
  set: (value: any, expiration?: number) => void;
  clear: () => void;
}

export interface RedisRequest extends Request {
  redis: RedisProvider;
}
