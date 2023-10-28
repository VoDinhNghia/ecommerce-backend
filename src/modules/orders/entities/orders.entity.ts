import { EpaymentTypes, EstatusOrder } from 'src/constants/constant';
import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { OrderDetail } from './orders.detail.entity';

@Entity({
  name: 'orders_mgt',
})
export class OrdersMgt extends EntityBasic {
  @Column({ type: 'datetime' })
  deliveryDate?: Date;

  @Column()
  address?: string;

  @Column()
  deliveryTime?: string;

  @Column()
  mobile?: string;

  @Column({ nullable: true })
  note?: string;

  @Column({ default: EpaymentTypes.CASH })
  paymentType?: string;

  @Column({ default: EstatusOrder.WAITTING })
  status?: string;

  @Column()
  total?: number;

  @Column()
  userName?: string;

  @ManyToOne(() => Users, (user) => user.orders)
  user?: Users;

  @OneToOne(() => OrderDetail, (detail) => detail.order, {
    cascade: ['soft-remove', 'recover'],
  })
  detail?: OrderDetail;
}
