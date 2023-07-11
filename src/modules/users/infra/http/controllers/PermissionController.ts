import CreatePermissionService from '@modules/users/services/CreatePermissionService';
// import ListUserService from '@modules/users/services/ListUserService';
// import ShowProfileService from '@modules/users/services/ShowProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

class PermissionsController {
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

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createPermission = container.resolve(CreatePermissionService);
    const permission = await createPermission.execute({
      name,
      description,
    });

    return response.json(instanceToInstance(permission));
  }
}

export default PermissionsController;
