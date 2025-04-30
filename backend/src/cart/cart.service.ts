import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Redis } from 'ioredis';

@Injectable()
export class CartService {
    constructor(
        private prisma: PrismaService,
        private redis: Redis
    ) { }

    private getCacheKey(email: string) {
        return `cart:${email}`;
    }

    async addToCart(userEmail: string, productId: number, quantity: number) {
        let cart = await this.prisma.cart.findFirst({ where: { userEmail } });

        if (!cart) {
            cart = await this.prisma.cart.create({ data: { userEmail } });
        }

        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new NotFoundException('Product does not exist');

        const existingItem = await this.prisma.cartProduct.findUnique({
            where: { cartId_productId: { cartId: cart.id, productId } },
        });


        if (existingItem) {
            await this.prisma.cartProduct.update({
                where: { cartId_productId: { cartId: cart.id, productId } },
                data: { quantity: existingItem.quantity + quantity },
            });
        } else {
            await this.prisma.cartProduct.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }

        await this.redis.del(this.getCacheKey(userEmail));
        return { message: 'Product successfully added to the cart.' };
    }

    async removeFromCart(userEmail: string, productId: number) {

        const cart = await this.prisma.cart.findFirst({ where: { userEmail } });
        if (!cart) throw new NotFoundException('Cart dont founded');

        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new NotFoundException('Product does not exist');

        const item = await this.prisma.cartProduct.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });
        if (!item) throw new NotFoundException('Product not found in the cart');

        await this.prisma.cartProduct.delete({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        await this.redis.del(this.getCacheKey(userEmail));
        return { message: 'Product successfully added to the cart.' };
    }

    async updateQuantity(userEmail: string, productId: number, newQuantity: number) {
        const cart = await this.prisma.cart.findFirst({ where: { userEmail } });
        if (!cart) throw new NotFoundException('Cart not found');

        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new NotFoundException('Product does not exist');

        const item = await this.prisma.cartProduct.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });
        if (!item) throw new NotFoundException('Product not found in the cart');

        await this.prisma.cartProduct.update({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
            data: { quantity: newQuantity },
        });

        await this.redis.del(this.getCacheKey(userEmail));

        return true;
    }

    async listCartItems(userEmail: string) {
        if (!userEmail) throw new NotFoundException('User dont founded');
        const cacheKey = this.getCacheKey(userEmail);
        const cached = await this.redis.get(cacheKey);
        if (cached) return JSON.parse(cached);

        const cart = await this.prisma.cart.findFirst({
            where: { userEmail },
            include: {
                cartProducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) return [];

        const result = cart.cartProducts.map((item) => ({
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            total: item.product.price * item.quantity,
        }));

        await this.redis.set(cacheKey, JSON.stringify(result), 'EX', 60);
        return result;
    }
}
