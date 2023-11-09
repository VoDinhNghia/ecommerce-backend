import { PartialType } from '@nestjs/swagger';
import { CreateProductDetailDto } from './products.create-detail.dto';

export class UpdateProductDetailDto extends PartialType(
  CreateProductDetailDto,
) {}
