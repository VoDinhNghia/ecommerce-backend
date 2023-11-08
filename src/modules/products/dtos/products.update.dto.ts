import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './products.create.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
