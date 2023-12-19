import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Products } from './products.entity';

@Entity({
  name: 'product_rate',
})
export class ProductRate extends EntityBasic {
  @Column()
  rate?: number;

  @Column()
  productId?: string;

  @Column()
  userId?: string;

  @ManyToOne(() => Users, (user) => user.rates)
  user?: Users;

  @ManyToOne(() => Products, (product) => product.rates)
  product?: Products;
}
