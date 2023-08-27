import { DataSource } from 'typeorm';
import { CreateUserTable1687132617418 } from './migrations/1687132617418-CreateUserTable';
import { CreatePermissions1688690941044 } from './migrations/1688690941044-CreatePermissions';
import { CreatePermissionsRoles1688691757371 } from './migrations/1688691757371-CreatePermissionsRoles';
import { CreateRoles1688690601066 } from './migrations/1688690601066-CreateRoles';
import { CreateUserRoles1688691089939 } from './migrations/1688691089939-CreateUserRoles';
import { CreateUserPermissions1688691562225 } from './migrations/1688691562225-CreateUserPermissions';
import { CreateUserTokensTable1693091111568 } from './migrations/1693091111568-CreateUserTokensTable';

import User from '@modules/users/infra/typeorm/entities/User';
import Permission from '@modules/users/infra/typeorm/entities/Permission';
import Role from '@modules/users/infra/typeorm/entities/Role';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'acrux',
  synchronize: true,
  logging: false,
  entities: [User, Permission, Role, UserToken],
  subscribers: [],
  migrations: [
    CreateUserTable1687132617418,
    CreatePermissions1688690941044,
    CreatePermissionsRoles1688691757371,
    CreateRoles1688690601066,
    CreateUserRoles1688691089939,
    CreateUserPermissions1688691562225,
    CreateUserTokensTable1693091111568,
  ],
});
