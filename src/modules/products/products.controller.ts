import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  Put,
  Get,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { productController } from 'src/constants/constants.controller.name';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { ErolesUser } from 'src/constants/constant';
import { CreateProductDto } from './dtos/products.create.dto';
import { Response } from 'express';
import { ResponseRequest } from 'src/utils/utils.response-api';
import { productMsg } from 'src/constants/constants.message.response';
import { UpdateProductDto } from './dtos/products.update.dto';
import { QueryProductDto } from './dtos/products.query.dto';
import { CreateProductDetailDto } from './dtos/products.create-detail.dto';
import { CreateProductDiscountDto } from './dtos/products.create-discount.dto';
import { UpdateProductDiscount } from './dtos/products.update-discount.dto';
import { UpdateProductDetailDto } from './dtos/products.update-detail.dto';

@Controller(productController.name)
@ApiTags(productController.tag)
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async createProduct(
    @Body() productDto: CreateProductDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.createProduct(productDto);
    return new ResponseRequest(res, result, productMsg.createProduct);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async updateProduct(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.updateProduct(id, updateDto);
    return new ResponseRequest(res, true, productMsg.updateProduct);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async deleteProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.deleteProduct(id);
    return new ResponseRequest(res, true, productMsg.deleteProduct);
  }

  @Get()
  async findProducts(
    @Query() queryDto: QueryProductDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const results = await this.service.findAllProducts(queryDto);
    return new ResponseRequest(res, results, productMsg.deleteProduct);
  }

  @Post('/detail')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async createDetail(
    @Body() detailDto: CreateProductDetailDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.createDetail(detailDto);
    return new ResponseRequest(res, result, productMsg.createDetail);
  }

  @Put('/detail/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async updateDetail(
    @Param('id') id: string,
    @Body() detailDto: UpdateProductDetailDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.updateDetail(id, detailDto);
    return new ResponseRequest(res, true, productMsg.updateDetail);
  }

  @Post('/discount')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async createDiscount(
    @Body() discountDto: CreateProductDiscountDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.createDiscount(discountDto);
    return new ResponseRequest(res, result, productMsg.createDiscount);
  }

  @Put('/discount/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async updateDiscount(
    @Param('id') id: string,
    @Body() discountDto: UpdateProductDiscount,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.updateDiscount(id, discountDto);
    return new ResponseRequest(res, true, productMsg.updateDiscount);
  }

  @Delete('/discount/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async deleteDiscount(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.deleteDiscount(id);
    return new ResponseRequest(res, true, productMsg.deleteDiscount);
  }
}
