import * as express from 'express' // Load express
import logger from '../log/logger' // Load logger
import { header } from '../common/constants';
import users from '../module/users/users.routes'
import auth from '../module/auth/auth.routes'
import admin from '../module/admin/admin.routes';
import members from '../module/member/member.routes';
import { apiHandler, authorize } from '../module/api/api.controller';
import { genRequestId } from '../utils/utils';

logger.info('Loading server api routes');

let apiRouter = express.Router(); // Load router

apiRouter.use((req, res, next) => {
  req.reqId = req.get(header.transaction) || genRequestId();
  req.reqDate = new Date();
  apiHandler(req, res, next)
});

//  Load routes for out controllers
apiRouter.use('/admin', admin);
apiRouter.use('/auth', auth);
apiRouter.use('/users', users);
apiRouter.use('/members', members);

apiRouter.use(authorize);

logger.info('Server api routes loaded');

export default apiRouter
