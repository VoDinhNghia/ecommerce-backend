import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { orderController } from 'src/constants/constants.controller.name';
import { OrdersService } from './orders.service';

@Controller(orderController.name)
@ApiTags(orderController.tag)
export class OrdersController {
  constructor(private service: OrdersService) {}
}
