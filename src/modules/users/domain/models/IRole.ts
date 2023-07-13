import Permission from '@modules/users/infra/typeorm/entities/Permission';

export interface IRole {
  role_id: string;
  name: string;
  description: string;
  created_at: Date;
  permissions: Permission[];
}
