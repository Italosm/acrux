import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import RolesController from '../controllers/RoleController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const rolesRouter = Router();
const rolesController = new RolesController();

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

export default rolesRouter;
