import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../prisma/prisma.service';
import { RedisClient } from "../redis/redis.client";

@Module({
    controllers: [CartController],
    providers: [
        CartService,
        PrismaService,
        RedisClient
    ],
})
export class CartModule { }
