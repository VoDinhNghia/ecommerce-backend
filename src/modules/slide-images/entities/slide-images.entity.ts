import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'slide_image_adv',
})
export class SlideImageAdv extends EntityBasic {
  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  isActive?: boolean;

  @Column()
  originName?: string;

  @Column()
  url?: string;
}
