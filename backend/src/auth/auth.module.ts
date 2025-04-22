import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RedisClient } from '../redis/redis.client';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RedisClient],
})
export class AuthModule {}
