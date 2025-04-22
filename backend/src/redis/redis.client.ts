import { Provider } from '@nestjs/common';
import Redis from 'ioredis';

export const RedisClient: Provider = {
  provide: Redis,
  useFactory: () => new Redis(process.env.REDIS_URL || 'redis://redis:6379'),
};