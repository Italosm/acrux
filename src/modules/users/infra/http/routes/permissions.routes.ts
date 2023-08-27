import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PermissionController from '../controllers/PermissionController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const permissionsRouter = Router();
const permissionsController = new PermissionController();

permissionsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  permissionsController.create,
);

export default permissionsRouter;
