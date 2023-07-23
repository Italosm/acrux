import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import {
  IUsersRepository,
  SearchParams,
} from '@modules/users/domain/repositories/IUsersRepository';
import { v4 as uuidv4 } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';
import { IPaginateUser } from '../../models/IPaginateUser';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const data = this.users;
    const result = {
      current_page: page,
      total: skip,
      per_page: take,
      data,
    };
    return result;
  }
  public async create({
    name,
    surname,
    email,
    user_status,
    password,
  }: ICreateUser): Promise<User> {
    const user = new User();
    user.user_id = uuidv4();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.user_status = user_status;
    user.password = password;
    this.users.push(user);
    return user;
  }

  public async remove(user: User): Promise<void> {
    user.user_status = false;
    return;
  }

  public async save(user: User): Promise<User> {
    Object.assign(this.users, user);
    return user;
  }

  public async findById(user_id: string): Promise<User | null> {
    const user = this.users.find(user => user.user_id === user_id);
    if (!user) {
      return null;
    }
    return user;
  }
  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    if (!user) {
      return null;
    }
    return user;
  }
}

export default FakeUsersRepository;
