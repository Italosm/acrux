import CreateRolePermissionService from '@modules/users/services/CreateRolePermissionService';
// import ListUserService from '@modules/users/services/ListUserService';
// import ShowProfileService from '@modules/users/services/ShowProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

class RolesPermissionsController {
  // public async index(request: Request, response: Response): Promise<Response> {
  //   const page = request.query.page ? Number(request.query.page) : 1;
  //   const limit = request.query.limit ? Number(request.query.limit) : 15;
  //   const listUser = container.resolve(ListUserService);
  //   const users = await listUser.execute({ page, limit });
  //   return response.json(instanceToInstance(users));
  // }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { role_id } = request.params;
  //   const id = role_id;

  //   const showUser = container.resolve(ShowProfileService);

  //   const user = await showUser.execute({ id });

  //   return response.json(instanceToInstance(user));
  // }

  public async update(request: Request, response: Response): Promise<Response> {
    const { role_id } = request.params;
    const { permissions } = request.body;
    const createRolePermission = container.resolve(CreateRolePermissionService);
    const role = await createRolePermission.execute({
      role_id,
      permissions,
    });
    return response.json(instanceToInstance(role));
  }
}

export default RolesPermissionsController;
