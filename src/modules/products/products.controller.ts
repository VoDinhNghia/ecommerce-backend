import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { productController } from 'src/constants/constants.controller.name';
import { ProductsService } from './products.service';

@Controller(productController.name)
@ApiTags(productController.tag)
export class ProductsController {
  constructor(private service: ProductsService) {}
}
