import { Controller, Get } from '@nestjs/common';
import { ProductService } from './produc.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.getAll();
  }
}
