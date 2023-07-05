import { DataSource } from 'typeorm';
import { CreateUserTable1687132617418 } from './migrations/1687132617418-CreateUserTable';
import User from '@modules/users/infra/typeorm/entities/User';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [CreateUserTable1687132617418],
});
