import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from './cache-provider.interface';
import cacheConfig from '../../../../config/redis.config';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  async save(key: string, value: any): Promise<void> {
    // Expira depois de 3 dias
    await this.client.set(key, JSON.stringify(value), 'EX', 259200);
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parseData = JSON.parse(data) as T;

    return parseData;
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
