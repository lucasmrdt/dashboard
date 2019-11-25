import redis from 'redis';
import httpStatus from 'http-status-codes';
import config from 'config';

import { RedisClient } from 'redis';
import { RequestHandler } from 'express';

const openedClients: RedisClient[] = [];

export const openRedis = () => {
  const client = redis.createClient({ url: config.redis.uri });
  openedClients.push(client);
  client.on('error', e => {
    console.warn(`[redis] Error occured ${e.message}. (Cache is now disabled)`);
  });

  // Always clear client before use it
  client.flushall();
  return client;
};

export const closeRedis = () => {
  openedClients.forEach(client => client.quit());
};

const defaultClient = openRedis();

interface Config {
  key: string;
  getSubdomainFromRequest?: (req: any) => string | string[];
  expiration?: number;
  newClient?: boolean;
}

/**
 * Create redis cache
 *
 * @param config.key the unique key of cache
 * @param config.expiration the default expiration of items
 * @param config.getSubdomainFromRequest function that allows to get subdomain from request (used in middleware)
 * @param config.newClient create new redis client ?
 */
export const createCache = (config: Config) => {
  const {
    key,
    expiration: configExpiration = 3600, // 1 hour by default
    getSubdomainFromRequest,
    newClient = false,
  } = config;

  const client = newClient ? openRedis() : defaultClient;

  const getSubdomain = (subdomain?: string | string[]) =>
    Array.isArray(subdomain) ? subdomain.join('-') : subdomain;

  const getKey = (subdomain?: string | string[]) =>
    subdomain ? `${key}:${getSubdomain(subdomain)}` : key;

  const clear = (subdomain?: string | string[]) => {
    client.del(getKey(subdomain));
  };

  const clearAll = () => {
    // prettier-ignore
    client.keys(`${key}*`, (e, keys) => keys && keys.forEach(k => client.del(k)));
  };

  const set = (
    value: any,
    {
      expiration = configExpiration,
      subdomain,
    }: { expiration?: number; subdomain?: string | string[] } = {}
  ) => {
    client.setex(getKey(subdomain), expiration, JSON.stringify(value));
  };

  const get = (subdomain?: string | string[]) => {
    return new Promise((res, rej) =>
      client.get(getKey(subdomain), (e, value) =>
        !e && value ? res(JSON.parse(value)) : rej(e)
      )
    );
  };

  const middleware: RequestHandler = async (req, res, next) => {
    try {
      const subdomain = getSubdomainFromRequest && getSubdomainFromRequest(req);
      const value = await get(subdomain);
      res.status(httpStatus.OK).json(value);
    } catch {
      // fail to retrieve the data, compute it.
      next();
    }
  };

  return { clear, clearAll, set, get, middleware };
};
