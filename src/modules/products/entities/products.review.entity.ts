import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Products } from './products.entity';

@Entity({
  name: 'product_reviews',
})
export class ProductReview extends EntityBasic {
  @Column()
  content?: string;

  @Column()
  rate?: number;

  @ManyToOne(() => Users, (user) => user.reviews)
  user?: Users;

  @ManyToOne(() => Products, (product) => product.reviews)
  product?: Products;
}
