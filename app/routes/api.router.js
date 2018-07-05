import * as express from 'express'; // Load express
import logger from '../utils/logger' // Load logger
import * as controller from '../module/api/api.controller'; // Load controller
import * as appUtils from '../utils/app-utils';
import userRouter from '../module/user/user.routes'
import authenRouter from '../module/authentication/authentication.routes'
logger.info('Loading server api routes');

let apiRouter = express.Router();   // Load router

apiRouter.use((req, res, next) => {
  req.reqId = appUtils.genRequestId();
  req.reqDate = new Date();
  controller.api(req, res, next)
});

//  Load routes for out controllers
apiRouter.use('/authen', authenRouter);
apiRouter.use('/user', userRouter);

apiRouter.use((req, res, next) => {
  controller.authorize(req, res, next)
});

logger.info('Server api routes loaded');

export default apiRouter;
