import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { categoryController } from 'src/constants/constants.controller.name';
import { CategoriesService } from './categories.service';

@Controller(categoryController.name)
@ApiTags(categoryController.tag)
export class CategoriesController {
  constructor(private service: CategoriesService) {}
}
