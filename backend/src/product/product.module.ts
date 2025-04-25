import { Module } from "@nestjs/common";
import { RedisClient } from "../redis/redis.client";

@Module({
    controllers: [],
    providers: [RedisClient],
})
export class ProductModule {}