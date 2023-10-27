import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './categories.create.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
