import { EgenderUser, ErolesUser } from 'src/constants/constant';
import { GenerateCode } from 'src/utils/utils.generate.code';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  updatedAt: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  @Column({ nullable: true })
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

  @Column()
  mobile?: string;

  @Column({ default: EgenderUser.MALE })
  gender?: string;

  @Column()
  address?: string;

  @Column({ default: new GenerateCode().getCodeUser(7) })
  code?: string;
}
