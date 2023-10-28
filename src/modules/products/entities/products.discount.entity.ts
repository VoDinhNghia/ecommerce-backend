import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Products } from './products.entity';

@Entity({
  name: 'product_discounts',
})
export class ProductDiscounts extends EntityBasic {
  @Column()
  discount?: number;

  @Column({ type: 'datetime' })
  startDate?: Date;

  @Column({ type: 'datetime' })
  endDate?: Date;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Products, (product) => product.discounts)
  product?: Products;
}
