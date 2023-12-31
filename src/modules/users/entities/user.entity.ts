import { EgenderUser, ErolesUser } from 'src/constants/constant';
import { OrdersMgt } from 'src/modules/orders/entities/orders.entity';
import { ProductRate } from 'src/modules/products/entities/products.rate.entity';
import { ProductReview } from 'src/modules/products/entities/products.review.entity';
import { GenerateCode } from 'src/utils/utils.generate.code';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, type: 'datetime', select: false })
  deletedAt?: Date;

  @Column({ length: 200 })
  email?: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: ErolesUser.USER })
  role?: string;

  @Column({ unique: true })
  mobile?: string;

  @Column({ default: EgenderUser.MALE })
  gender?: string;

  @Column()
  address?: string;

  @Column({ default: new GenerateCode().getCodeUser(7) })
  code?: string;

  @OneToMany(() => ProductReview, (review) => review.user, {
    cascade: ['soft-remove', 'recover'],
  })
  reviews?: ProductReview[];

  @OneToMany(() => OrdersMgt, (order) => order.user, {
    cascade: ['soft-remove', 'recover'],
  })
  orders?: OrdersMgt[];

  @OneToMany(() => ProductRate, (rate) => rate.user, {
    cascade: ['soft-remove', 'recover'],
  })
  rates?: ProductRate[];
}
