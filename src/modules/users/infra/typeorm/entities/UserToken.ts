import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';
import { IUserToken } from '@modules/users/domain/models/IUserToken';

@Entity('user_tokens')
class UserToken implements IUserToken {
  id: string;
  @PrimaryGeneratedColumn('uuid')
  token_id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
