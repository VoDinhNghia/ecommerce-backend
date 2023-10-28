import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'store_general_info',
})
export class StoreGeneralInfo extends EntityBasic {
  @Column()
  content?: string;

  @Column({ default: true })
  isDisplay?: boolean;
}
