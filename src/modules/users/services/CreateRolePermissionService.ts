import { inject, injectable } from 'tsyringe';
import { IRolesRepository } from '../domain/repositories/IRolesRepository';
import AppError from '@shared/errors/AppError';
import { IRole } from '../domain/models/IRole';
import { IPermissionsRepository } from '../domain/repositories/IPermissionsRepository';
import { IRolePermission } from '../domain/models/IRolePermission';

@injectable()
class CreateRolePermissionService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}
  public async execute({
    role_id,
    permissions,
  }: IRolePermission): Promise<IRole> {
    const role = await this.rolesRepository.findById(role_id);
    if (!role) {
      throw new AppError('Role does not exists.');
    }

    const permissionsExists = await this.permissionsRepository.findByIds(
      permissions,
    );
    if (!permissionsExists) {
      throw new AppError('Permissions does not exists.');
    }
    role.permissions = permissionsExists;
    await this.rolesRepository.save(role);
    return role;
  }
}

export default CreateRolePermissionService;
