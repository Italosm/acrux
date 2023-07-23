import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PermissionController from '../controllers/PermissionController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { can } from '@shared/infra/http/middlewares/permissions';

const permissionsRouter = Router();
const permissionsController = new PermissionController();

permissionsRouter.post(
  '/',
  isAuthenticated,
  can(['create_permissions']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  permissionsController.create,
);

export default permissionsRouter;
