import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'services_us',
})
export class ServicesUs extends EntityBasic {
  @Column()
  description?: string;

  @Column()
  name?: string;

  @Column()
  url?: string;

  @Column()
  price?: number;
}
