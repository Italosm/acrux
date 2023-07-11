import { inject, injectable } from 'tsyringe';
import { IPermissionsRepository } from '../domain/repositories/IPermissionsRepository';
import AppError from '@shared/errors/AppError';
import { IPermission } from '../domain/models/IPermission';
import { ICreatePermission } from '../domain/models/ICreatePermission';

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}
  public async execute({
    name,
    description,
  }: ICreatePermission): Promise<IPermission> {
    const permissionExists = await this.permissionsRepository.findByName(name);
    if (permissionExists) {
      throw new AppError('Permission already exists.');
    }

    const permission = await this.permissionsRepository.create({
      name,
      description,
    });
    return permission;
  }
}

export default CreatePermissionService;
