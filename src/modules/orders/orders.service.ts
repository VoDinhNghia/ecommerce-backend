import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersMgt } from './entities/orders.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/orders.detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersMgt)
    private orderRepo: Repository<OrdersMgt>,
    @InjectRepository(OrderDetail)
    private detailRepo: Repository<OrderDetail>,
  ) {}
}
