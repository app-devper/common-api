import * as express from 'express' // Load express
import logger from '../log/logger' // Load logger
import * as controller from '../module/api/api.controller' // Load controller
import * as appUtils from '../utils/app-utils'
import { header } from '../common/constants';
import userRouter from '../module/users/users.routes'
import authenRouter from '../module/authenticate/authenticate.routes'
import adminRouter from '../module/admin/admin.routes';

logger.info('Loading server api routes');

let apiRouter = express.Router(); // Load router

apiRouter.use((req, res, next) => {
  req.reqId = req.get(header.transaction) || appUtils.genRequestId();
  req.reqDate = new Date();
  controller.api(req, res, next)
});

//  Load routes for out controllers
apiRouter.use('/admin', adminRouter);
apiRouter.use('/authenticate', authenRouter);
apiRouter.use('/users', userRouter);

apiRouter.use((req, res) => {
  controller.authorize(req, res)
});

logger.info('Server api routes loaded');

export default apiRouter
