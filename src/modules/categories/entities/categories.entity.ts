import { Products } from 'src/modules/products/entities/products.entity';
import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Categories extends EntityBasic {
  @Column({ nullable: true, length: 2000 })
  description?: string;

  @Column()
  name?: string;

  @OneToMany(() => Products, (product) => product.category, {
    cascade: ['soft-remove', 'recover'],
  })
  products?: Products[];
}
