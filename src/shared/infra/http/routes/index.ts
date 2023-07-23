import aclRouter from '@modules/users/infra/http/routes/acl.routes';
import permissionsRouter from '@modules/users/infra/http/routes/permissions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from 'swagger.json';
import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/roles', rolesRouter);
routes.use('/permissions', permissionsRouter);
routes.use('/acl', aclRouter);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default routes;
