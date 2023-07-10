import { IPermission } from '@modules/permissions/domain/models/IPermission';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('permissions')
class Permission implements IPermission {
  @PrimaryGeneratedColumn('uuid')
  permission_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Permission;
