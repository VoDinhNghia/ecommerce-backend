import { FindOperator } from 'typeorm';

export interface IqueryUser {
  firstName?: FindOperator<string>;
  isDeleted?: boolean;
  middleName?: FindOperator<string>;
  lastName?: FindOperator<string>;
  mobile?: FindOperator<string>;
  email?: FindOperator<string>;
}

export type IqueryBySearchKey = IqueryUser[];
