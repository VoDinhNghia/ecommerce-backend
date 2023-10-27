import { FindOperator } from 'typeorm';

export interface IqueryCategory {
  isDeleted?: boolean;
  name?: FindOperator<string>;
}
