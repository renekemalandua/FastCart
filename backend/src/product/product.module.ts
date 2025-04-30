import { Module } from "@nestjs/common";
import { RedisClient } from "../redis/redis.client";
import { ProductService } from "./produc.service";
import { PrismaService } from "../prisma/prisma.service";
import { ProductController } from "./produc.controller";

@Module({
    controllers: [ProductController],
    providers: [RedisClient, ProductService, PrismaService],
})
export class ProductModule {}
