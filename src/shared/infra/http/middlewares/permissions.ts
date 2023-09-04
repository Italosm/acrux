/* eslint-disable no-console */
import Role from '@modules/users/infra/typeorm/entities/Role';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export function can(permissionsRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { user_id } = request.user;
    const usersRepository = new UsersRepository();
    const rolesRepository = new RolesRepository();
    const user = await usersRepository.findByIdWithRelations(user_id, [
      'permissions',
      'roles',
    ]);

    if (!user) {
      throw new AppError('User not found.');
    }

    const permissionExists = user.permissions
      .map(permission => permission.name)
      .some(permission => permissionsRoutes.includes(permission));
    const userRoles = user.roles.map(role => role.role_id);
    const rolePermissionsPromises = userRoles.map(async role_id => {
      return await rolesRepository.findByIdWithRelations(role_id, [
        'permissions',
      ]);
    });
    const rolePermissions: PromiseSettledResult<Role | null>[] =
      await Promise.allSettled(rolePermissionsPromises);

    const rolePermissionExists = rolePermissions
      .map(role => {
        if (role.status === 'fulfilled' && role.value) {
          return role.value.permissions
            .map(permission => permission.name)
            .some(permission => permissionsRoutes.includes(permission));
        }
      })
      .includes(true);

    if (!permissionExists && !rolePermissionExists) {
      throw new AppError('Unauthorized.', 401);
    }

    return next();
  };
}

export function is(rolesRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { user_id } = request.user;
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByIdWithRelations(user_id, [
      'roles',
    ]);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const roleExists = user.roles
      .map(role => role.name)
      .some(role => rolesRoutes.includes(role));

    if (!roleExists) {
      throw new AppError('Unauthorized.', 401);
    }

    return next();
  };
}
