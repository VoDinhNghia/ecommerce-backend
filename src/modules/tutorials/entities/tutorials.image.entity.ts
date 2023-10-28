import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Tutorials } from './tutorials.entity';

@Entity({
  name: 'tutorial_images',
})
export class TutorialImages extends EntityBasic {
  @Column()
  originName?: string;

  @Column()
  url?: string;

  @ManyToOne(() => Tutorials, (tutorial) => tutorial.images)
  tutorial?: Tutorials;
}
