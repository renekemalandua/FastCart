import { Controller, Post, Delete, Get, Body, Query, Patch, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post('add')
    async addToCart(
        @Body() body: { email: string; productId: number; quantity: number },
    ) {
        const { email, productId, quantity } = body;
        return this.cartService.addToCart(email, productId, quantity);
    }

    @Delete('remove/:email/:productId')
    async removeFromCart(
        @Param('email') email: string,
        @Param('productId') productId: string,
    ) {
        return this.cartService.removeFromCart(email, Number(productId));
    }

    @Get('list/:email')
    async listCartItems(@Param('email') email: string) {
        return this.cartService.listCartItems(email);
    }

    @Patch('update')
    async updateQuantity(
        @Body() body: { email: string; productId: number; newQuantity: number },
    ) {
        return this.cartService.updateQuantity(
            body.email,
            body.productId,
            body.newQuantity,
        );
    }
}