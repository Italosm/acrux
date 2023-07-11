import { IRole } from './IRole';

export interface IPaginateRole {
  per_page: number;
  total: number;
  current_page: number;
  data: IRole[];
}
