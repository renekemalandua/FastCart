import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {

    private readonly CACHE_KEY = 'products:all';

    constructor(
        private readonly prisma: PrismaService,
        private readonly redis: Redis
    ) { }

    async getAll() {
        const cached = await this.redis.get(this.CACHE_KEY);
        if (cached) {
            return JSON.parse(cached);
        }
        const products = await this.prisma.product.findMany();
        await this.redis.set(this.CACHE_KEY, JSON.stringify(products), 'EX', 60);
        return (products);
    }

    async clearCache() {
        await this.redis.del(this.CACHE_KEY);
    }
}
