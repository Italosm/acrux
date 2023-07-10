import { IPermission } from './IPermission';

export interface IPaginatePermission {
  per_page: number;
  total: number;
  current_page: number;
  data: IPermission[];
}
