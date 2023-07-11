import Permission from '@modules/users/infra/typeorm/entities/Permission';
import Role from '@modules/users/infra/typeorm/entities/Role';

export interface IUser {
  user_id: string;
  name: string;
  surname: string;
  email: string;
  user_status: boolean;
  password: string;
  roles: Role[];
  permissions: Permission[];
  created_at: Date;
  updated_at: Date;
}
