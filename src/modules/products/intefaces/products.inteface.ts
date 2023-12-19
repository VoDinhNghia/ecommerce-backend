import { FindOperator } from 'typeorm';

export interface IqueryProduct {
  name?: FindOperator<string>;
  categoryId?: FindOperator<string>;
}
