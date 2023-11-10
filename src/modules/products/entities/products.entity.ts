import { Categories } from 'src/modules/categories/entities/categories.entity';
import { EntityBasic } from 'src/utils/utils.entity.basic';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ProductDetail } from './products.detail.entity';
import { ProductReview } from './products.review.entity';
import { ProductImages } from './products.image.entity';
import { ProductDiscounts } from './products.discount.entity';
import { ProductRate } from './products.rate.entity';

@Entity()
export class Products extends EntityBasic {
  @Column()
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  price?: number;

  @Column()
  quantity?: number;

  @ManyToOne(() => Categories, (category) => category.products)
  category?: Categories;

  @OneToOne(() => ProductDetail, (detail) => detail.product, {
    cascade: ['soft-remove', 'recover'],
  })
  @JoinColumn()
  detail?: ProductDetail;

  @OneToMany(() => ProductReview, (review) => review.product, {
    cascade: ['soft-remove', 'recover'],
  })
  reviews?: ProductReview[];

  @OneToMany(() => ProductImages, (image) => image.product, {
    cascade: ['soft-remove', 'recover'],
  })
  images?: ProductImages[];

  @OneToMany(() => ProductDiscounts, (discount) => discount.product, {
    cascade: ['soft-remove', 'recover'],
  })
  discounts?: ProductDiscounts[];

  @ManyToOne(() => ProductRate, (rate) => rate?.product, {
    cascade: ['soft-remove', 'recover'],
  })
  rates?: ProductRate[];
}
