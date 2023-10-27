import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity } from 'typeorm';

@Entity()
export class Categories extends EntityBasic {
  @Column({ nullable: true, length: 2000 })
  description?: string;

  @Column()
  name?: string;
}
