import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { IPaginatePermission } from '@modules/permissions/domain/models/IPaginatePermission';
import { ICreatePermission } from '@modules/permissions/domain/models/ICreatePermission';
import { IPermissionsRepository } from '@modules/permissions/domain/repositories/IPermissionsRepository';
import Permission from '../entities/Permission';
import { SearchParams } from '@modules/users/domain/repositories/IUsersRepository';

class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Permission);
  }

  public async create({
    name,
    description,
  }: ICreatePermission): Promise<Permission> {
    const permission = this.ormRepository.create({
      name,
      description,
    });
    await this.ormRepository.save(permission);
    return permission;
  }

  public async save(permission: Permission): Promise<Permission> {
    await this.ormRepository.save(permission);
    return permission;
  }

  public async remove(permission: Permission): Promise<void> {
    await this.ormRepository.remove(permission);
  }
  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginatePermission> {
    const [permissions, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: permissions,
    };

    return result;
  }

  public async findById(permission_id: string): Promise<Permission | null> {
    const permission = await this.ormRepository.findOneBy({
      permission_id,
    });
    return permission;
  }
  public async findByName(name: string): Promise<Permission | null> {
    const permission = await this.ormRepository.findOneBy({
      name,
    });
    return permission;
  }
}

export default PermissionsRepository;
