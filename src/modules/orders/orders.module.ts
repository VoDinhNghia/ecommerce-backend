import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersMgt } from './entities/orders.entity';
import { OrderDetail } from './entities/orders.detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersMgt, OrderDetail])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
