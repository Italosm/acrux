import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { can } from '@shared/infra/http/middlewares/permissions';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get(
  '/',
  isAuthenticated,
  can(['list_users']),
  usersController.index,
);

usersRouter.get(
  '/:user_id',
  isAuthenticated,
  can(['list_users']),
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().required(),
    },
  }),
  usersController.show,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
