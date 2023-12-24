import { FindOperator } from 'typeorm';

export interface IquerySlideImage {
  isActive?: FindOperator<boolean> | boolean;
  originName?: FindOperator<string>;
}
