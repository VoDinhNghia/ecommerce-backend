import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { ProductDetail } from './entities/products.detail.entity';
import { ProductReview } from './entities/products.review.entity';
import { ProductImages } from './entities/products.image.entity';
import { ProductDiscounts } from './entities/products.discount.entity';
import { Categories } from '../categories/entities/categories.entity';
import { ProductRate } from './entities/products.rate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Products,
      ProductDetail,
      ProductReview,
      ProductImages,
      ProductDiscounts,
      Categories,
      ProductRate,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
