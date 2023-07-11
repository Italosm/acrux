import { inject, injectable } from 'tsyringe';
import { ICreateRole } from '../domain/models/ICreateRole';
import { IRolesRepository } from '../domain/repositories/IRolesRepository';
import AppError from '@shared/errors/AppError';
import { IRole } from '../domain/models/IRole';

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute({ name, description }: ICreateRole): Promise<IRole> {
    const roleExists = await this.rolesRepository.findByName(name);
    if (roleExists) {
      throw new AppError('Role already exists.');
    }

    const role = await this.rolesRepository.create({
      name,
      description,
    });
    return role;
  }
}

export default CreateRoleService;
