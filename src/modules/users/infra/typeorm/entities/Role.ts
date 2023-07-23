import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Permission from '@modules/users/infra/typeorm/entities/Permission';
import { IRole } from '@modules/users/domain/models/IRole';

@Entity('roles')
class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  role_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions: Permission[];

  @CreateDateColumn()
  created_at: Date;
}

export default Role;
