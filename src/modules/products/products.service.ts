import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Repository } from 'typeorm';
import { ProductDetail } from './entities/products.detail.entity';
import { ProductReview } from './entities/products.review.entity';
import { ProductImages } from './entities/products.image.entity';
import { ProductDiscounts } from './entities/products.discount.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepo: Repository<Products>,
    @InjectRepository(ProductDetail)
    private detailRepo: Repository<ProductDetail>,
    @InjectRepository(ProductReview)
    private reviewRepo: Repository<ProductReview>,
    @InjectRepository(ProductImages)
    private imageRepo: Repository<ProductImages>,
    @InjectRepository(ProductDiscounts)
    private discountRepo: Repository<ProductDiscounts>,
  ) {}
}
