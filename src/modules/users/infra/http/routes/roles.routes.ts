import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import RolesController from '../controllers/RoleController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import RolesPermissionsController from '../controllers/CreateRolePermissionController';

const rolesRouter = Router();
const rolesController = new RolesController();
const rolesPermissionsController = new RolesPermissionsController();

rolesRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  rolesController.create,
);
rolesRouter.post(
  '/:role_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      role_id: Joi.string().required(),
    },
    [Segments.BODY]: {
      permissions: Joi.array<string>().required(),
    },
  }),
  rolesPermissionsController.update,
);

export default rolesRouter;
