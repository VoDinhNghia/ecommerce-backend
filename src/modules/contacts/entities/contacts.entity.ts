import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity } from 'typeorm';

@Entity()
export class Contact extends EntityBasic {
  @Column()
  email?: string;

  @Column()
  location?: string;

  @Column()
  mobile?: string;

  @Column()
  name?: string;
}
