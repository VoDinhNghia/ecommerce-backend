import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, OneToOne } from 'typeorm';
import { Products } from './products.entity';

@Entity({
  name: 'product_detail',
})
export class ProductDetail extends EntityBasic {
  @Column({ type: 'datetime' })
  dateOfManufacture?: Date;

  @Column({ nullable: true })
  color?: string;

  @Column()
  country?: string;

  @Column()
  productId?: string;

  @Column({ nullable: true })
  inputPower?: string;

  @Column({ nullable: true })
  mainboard?: string;

  @Column({ nullable: true })
  memory?: string;

  @Column({ nullable: true })
  size?: string;

  @Column({ nullable: true })
  warrantyExpiration?: string;

  @OneToOne(() => Products, (product) => product.detail)
  product?: Products;
}
