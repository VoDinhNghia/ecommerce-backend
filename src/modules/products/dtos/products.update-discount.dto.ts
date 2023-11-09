import { PartialType } from '@nestjs/swagger';
import { CreateProductDiscountDto } from './products.create-discount.dto';

export class UpdateProductDiscount extends PartialType(
  CreateProductDiscountDto,
) {}
