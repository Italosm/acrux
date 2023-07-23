import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import CreateUseraccessControlListController from '../controllers/CreateUserAccessControlListController';

const aclRouter = Router();
const aclController = new CreateUseraccessControlListController();

aclRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      permissions: Joi.array<string>().required(),
      roles: Joi.array<string>().required(),
    },
  }),
  aclController.create,
);

export default aclRouter;
