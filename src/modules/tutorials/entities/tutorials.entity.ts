import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity, OneToMany } from 'typeorm';
import { TutorialImages } from './tutorials.image.entity';

@Entity()
export class Tutorials extends EntityBasic {
  @Column()
  content?: string;

  @Column()
  title?: string;

  @OneToMany(() => TutorialImages, (image) => image.tutorial, {
    cascade: ['soft-remove', 'recover'],
  })
  images?: TutorialImages[];
}
