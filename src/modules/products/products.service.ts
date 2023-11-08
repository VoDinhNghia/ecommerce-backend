import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Equal, Like, Repository } from 'typeorm';
import { ProductDetail } from './entities/products.detail.entity';
import { ProductReview } from './entities/products.review.entity';
import { ProductImages } from './entities/products.image.entity';
import { ProductDiscounts } from './entities/products.discount.entity';
import { CreateProductDto } from './dtos/products.create.dto';
import { Categories } from '../categories/entities/categories.entity';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { statusCodeRes } from 'src/constants/constants.http-status-code';
import {
  categoryMsg,
  productMsg,
} from 'src/constants/constants.message.response';
import { UpdateProductDto } from './dtos/products.update.dto';
import { QueryProductDto } from './dtos/products.query.dto';
import { IqueryProduct } from './intefaces/products.inteface';

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
    @InjectRepository(Categories)
    private categoryRepo: Repository<Categories>,
  ) {}

  async createProduct(productDto: CreateProductDto): Promise<Products> {
    const { categoryId } = productDto;
    await this.validateCategory(categoryId);
    const result = await this.productRepo.save(productDto);
    return result;
  }

  async findProductById(id: string): Promise<Products> {
    const result = await this.productRepo.findOneBy({ id: Equal(id) });
    if (!result) {
      new CommonException(statusCodeRes.NOT_FOUND, productMsg.notFoundProduct);
    }
    return result;
  }

  async updateProduct(id: string, productDto: UpdateProductDto): Promise<void> {
    const { categoryId } = productDto;
    if (categoryId) {
      await this.validateCategory(categoryId);
    }
    await this.findProductById(id);
    await this.productRepo.update(id, {
      ...productDto,
      updatedAt: new Date(),
    });
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.findProductById(id);
    await this.productRepo.softRemove(result);
  }

  async findAllProducts(
    queryDto: QueryProductDto,
  ): Promise<{ results: Products[]; total: number }> {
    const { limit, page, searchKey } = queryDto;
    const query: IqueryProduct = {};
    const total = await this.productRepo.count();
    if (searchKey) {
      query.name = Like(`%${searchKey}%`);
    }
    const results = await this.productRepo.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : 0,
      take: limit ? Number(limit) : total,
      relations: {
        detail: true,
        discounts: true,
        images: true,
        reviews: true,
        category: true,
      },
    });
    return {
      total,
      results,
    };
  }

  async validateCategory(categoryId: string): Promise<void> {
    const category = await this.categoryRepo.findOneBy({
      id: Equal(categoryId),
    });
    if (!category) {
      new CommonException(statusCodeRes.NOT_FOUND, categoryMsg.notFound);
    }
  }
}
