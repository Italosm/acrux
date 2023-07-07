import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Permission from '@modules/permissions/infra/typeorm/entities/Permission';

@Entity('roles')
class Role {
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
