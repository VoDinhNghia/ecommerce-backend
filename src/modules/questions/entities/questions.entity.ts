import { EntityBasic } from 'src/utils/utils.entity.basic';
import { Column, Entity } from 'typeorm';

@Entity()
export class Questions extends EntityBasic {
  @Column()
  question?: string;

  @Column({ nullable: true })
  anwser?: string;
}
