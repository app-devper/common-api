import * as express from 'express' // Load express
import logger from '../log/logger' // Load logger
import { header } from '../common/constants';
import userRouter from '../module/users/users.routes'
import authenRouter from '../module/authenticate/authenticate.routes'
import adminRouter from '../module/admin/admin.routes';
import { apiHandler, authorize } from "../module/api/api.controller";
import { genRequestId } from "../utils/utils";

logger.info('Loading server api routes');

let apiRouter = express.Router(); // Load router

apiRouter.use((req, res, next) => {
  req.reqId = req.get(header.transaction) || genRequestId();
  req.reqDate = new Date();
  apiHandler(req, res, next)
});

//  Load routes for out controllers
apiRouter.use('/admin', adminRouter);
apiRouter.use('/auth', authenRouter);
apiRouter.use('/users', userRouter);

apiRouter.use(authorize);

logger.info('Server api routes loaded');

export default apiRouter
