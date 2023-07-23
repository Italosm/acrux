import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICreateUserACL } from '../domain/models/ICreateUserACL';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { IPermissionsRepository } from '../domain/repositories/IPermissionsRepository';
import { IRolesRepository } from '../domain/repositories/IRolesRepository';

@injectable()
class CreateUserAccessControlListService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute({
    user_id,
    roles,
    permissions,
  }: ICreateUserACL): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exists!');
    }
    const permissionsExists = await this.permissionsRepository.findByIds(
      permissions,
    );
    const rolesExists = await this.rolesRepository.findByIds(roles);
    user.permissions = permissionsExists;
    user.roles = rolesExists;
    await this.usersRepository.save(user);
    return user;
  }
}

export default CreateUserAccessControlListService;
