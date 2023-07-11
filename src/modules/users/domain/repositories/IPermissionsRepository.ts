import { ICreatePermission } from '../models/ICreatePermission';
import { IPaginatePermission } from '../models/IPaginatePermission';
import { IPermission } from '../models/IPermission';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IPermissionsRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginatePermission>;
  findById(permission_id: string): Promise<IPermission | null>;
  findByName(name: string): Promise<IPermission | null>;
  create(data: ICreatePermission): Promise<IPermission>;
  save(permission: IPermission): Promise<IPermission>;
}
