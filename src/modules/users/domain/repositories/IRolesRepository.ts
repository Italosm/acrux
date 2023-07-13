import { ICreateRole } from '../models/ICreateRole';
import { IPaginateRole } from '../models/IPaginateRole';
import { IRole } from '../models/IRole';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IRolesRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateRole>;
  findById(role_id: string): Promise<IRole | null>;
  findByIds(role_id: string[]): Promise<IRole[] | null>;
  findByName(name: string): Promise<IRole | null>;
  create(data: ICreateRole): Promise<IRole>;
  save(role: IRole): Promise<IRole>;
}
