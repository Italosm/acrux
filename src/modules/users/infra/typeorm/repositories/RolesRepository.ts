import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { IPaginateRole } from '@modules/users/domain/models/IPaginateRole';
import { ICreateRole } from '@modules/users/domain/models/ICreateRole';
import { IRolesRepository } from '@modules/users/domain/repositories/IRolesRepository';
import Role from '../entities/Role';
import { SearchParams } from '@modules/users/domain/repositories/IUsersRepository';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Role);
  }

  public async create({ name, description }: ICreateRole): Promise<Role> {
    const user = this.ormRepository.create({
      name,
      description,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(role: Role): Promise<Role> {
    await this.ormRepository.save(role);
    return role;
  }

  public async remove(role: Role): Promise<void> {
    await this.ormRepository.remove(role);
  }
  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateRole> {
    const [roles, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: roles,
    };

    return result;
  }

  public async findById(role_id: string): Promise<Role | null> {
    const role = await this.ormRepository.findOneBy({
      role_id,
    });
    return role;
  }
  public async findByName(name: string): Promise<Role | null> {
    const role = await this.ormRepository.findOneBy({
      name,
    });
    return role;
  }
}

export default RolesRepository;
