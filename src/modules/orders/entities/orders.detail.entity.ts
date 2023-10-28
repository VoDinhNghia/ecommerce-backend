import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, OneToOne } from 'typeorm';
import { OrdersMgt } from './orders.entity';

@Entity({
  name: 'order_detail',
})
export class OrderDetail extends EntityBasic {
  @Column()
  image?: string;

  @Column()
  price?: number;

  @Column()
  productName?: string;

  @Column()
  quantity?: number;

  @OneToOne(() => OrdersMgt, (order) => order.detail)
  order?: OrdersMgt;
}
