import { dataSource } from '@shared/infra/typeorm';
import { In, Repository } from 'typeorm';
import { IPaginatePermission } from '@modules/users/domain/models/IPaginatePermission';
import { ICreatePermission } from '@modules/users/domain/models/ICreatePermission';
import { IPermissionsRepository } from '@modules/users/domain/repositories/IPermissionsRepository';
import Permission from '../entities/Permission';
import { SearchParams } from '@modules/users/domain/repositories/IUsersRepository';
import { IPermission } from '@modules/users/domain/models/IPermission';

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
  public async findByIds(
    permission_id: string[],
  ): Promise<IPermission[] | null> {
    const permission = await this.ormRepository.findBy({
      permission_id: In(permission_id),
    });
    return permission;
  }
}

export default PermissionsRepository;
