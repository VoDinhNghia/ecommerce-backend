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
import { CreateProductDetailDto } from './dtos/products.create-detail.dto';
import { UpdateProductDetailDto } from './dtos/products.update-detail.dto';
import { CreateProductDiscountDto } from './dtos/products.create-discount.dto';
import { UpdateProductDiscount } from './dtos/products.update-discount.dto';
import { CreateProductReview } from './dtos/products.create-review.dto';
import { ProductRate } from './entities/products.rate.entity';
import { UpdateProductReviewDto } from './dtos/products.update-review.dto';
import { CreateProductRateDto } from './dtos/products.create-rate.dto';
import { CreateProductImageDto } from './dtos/products.create-image.dto';
import { FileRequestDto } from 'src/utils/utils.file-request.dto';
import { unlinkSync } from 'fs';

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
    @InjectRepository(ProductRate)
    private rateRepo: Repository<ProductRate>,
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
    const { limit, page, searchKey, categoryId } = queryDto;
    const query: IqueryProduct = {};
    const total = await this.productRepo.count();
    if (searchKey) {
      query.name = Like(`%${searchKey}%`);
    }
    if (categoryId) {
      query.categoryId = Equal(categoryId);
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
        rates: true,
      },
    });
    return {
      total,
      results,
    };
  }

  async createDetail(
    detailDto: CreateProductDetailDto,
  ): Promise<ProductDetail> {
    const { productId } = detailDto;
    await this.findProductById(productId);
    const validDetail = await this.detailRepo.findOneBy({
      productId: Equal(productId),
    });
    if (validDetail) {
      new CommonException(statusCodeRes.CONFLICT, productMsg.detailExisted);
    }
    const result = await this.detailRepo.save(detailDto);
    await this.productRepo.update(productId, { detailId: result?.id });
    return result;
  }

  async findDetailById(id: string): Promise<ProductDetail> {
    const result = await this.detailRepo.findOneBy({ id: Equal(id) });
    if (!result) {
      new CommonException(statusCodeRes.NOT_FOUND, productMsg.detailNotFound);
    }
    return result;
  }

  async updateDetail(
    id: string,
    updateDto: UpdateProductDetailDto,
  ): Promise<void> {
    await this.findDetailById(id);
    await this.detailRepo.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
  }

  async createDiscount(
    discountDto: CreateProductDiscountDto,
  ): Promise<ProductDiscounts> {
    const { productId } = discountDto;
    await this.findProductById(productId);
    const result = await this.discountRepo.save(discountDto);
    return result;
  }

  async findDiscountById(id: string): Promise<ProductDiscounts> {
    const result = await this.discountRepo.findOneBy({ id: Equal(id) });
    if (!result) {
      new CommonException(statusCodeRes.NOT_FOUND, productMsg.notFoundDiscount);
    }
    return result;
  }

  async updateDiscount(
    id: string,
    updateDto: UpdateProductDiscount,
  ): Promise<void> {
    await this.findDiscountById(id);
    await this.discountRepo.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
  }

  async deleteDiscount(id: string): Promise<void> {
    await this.findDiscountById(id);
    await this.discountRepo.delete(id);
  }

  async createReview(
    reviewDto: CreateProductReview,
    userId: string,
  ): Promise<ProductReview> {
    const { productId } = reviewDto;
    await this.findProductById(productId);
    const result = await this.reviewRepo.save({ ...reviewDto, userId });
    return result;
  }

  async findReviewById(id: string): Promise<ProductReview> {
    const result = await this.reviewRepo.findOneBy({ id: Equal(id) });
    if (!result) {
      new CommonException(statusCodeRes.NOT_FOUND, productMsg.notFoundReview);
    }
    return result;
  }

  async updateReview(
    id: string,
    userId: string,
    updateDto: UpdateProductReviewDto,
  ): Promise<void> {
    const result = await this.findReviewById(id);
    if (String(result?.user?.id) !== userId) {
      new CommonException(
        statusCodeRes.FORBIDDEN,
        productMsg.permissonUpdateReview,
      );
    }
    await this.reviewRepo.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
  }

  async deleteReview(id: string): Promise<void> {
    const result = await this.findReviewById(id);
    await this.reviewRepo.softRemove(result);
  }

  async createRate(
    userId: string,
    rateDto: CreateProductRateDto,
  ): Promise<void> {
    const { productId, rate } = rateDto;
    const result = await this.rateRepo.findOneBy({
      user: Equal(userId),
      product: Equal(productId),
    });
    if (result) {
      await this.rateRepo.update(result?.id, { rate });
    }
    await this.rateRepo.save({ ...rateDto, userId });
  }

  async createImage(
    imageDto: CreateProductImageDto,
    fileDto: FileRequestDto,
  ): Promise<void> {
    const dto = {
      url: fileDto?.url,
      originName: fileDto?.originalname,
      productId: imageDto?.productId,
      isAvatar: imageDto?.isAvatar,
      path: fileDto?.path,
    };
    await this.imageRepo.save(dto);
  }

  async deleteImage(id: string): Promise<void> {
    const result = await this.imageRepo.findOneBy({ id: Equal(id) });
    if (!result) {
      new CommonException(statusCodeRes.NOT_FOUND, productMsg.imageNotfound);
    }
    await this.imageRepo.delete(id);
    unlinkSync(result?.path);
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
