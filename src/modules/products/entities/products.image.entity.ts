import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Products } from './products.entity';

@Entity({
  name: 'product_images',
})
export class ProductImages extends EntityBasic {
  @Column()
  originName?: string;

  @Column()
  url?: string;

  @Column({ default: false })
  isAvatar?: boolean;

  @ManyToOne(() => Products, (product) => product.images)
  product?: Products;
}
