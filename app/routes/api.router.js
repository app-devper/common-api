import * as express from 'express'; // Load express
import logger from '../utils/logger' // Load logger
import * as controller from '../module/api/api.controller'; // Load controller
import * as appUtils from '../utils/app-utils';
logger.info('Loading server api routes');

let router = express.Router();   // Load router

router.use((req, res, next) => {
  req.reqId = appUtils.genRequestId();
  req.reqDate = new Date();
  controller.api(req, res, next)
});

//  Load routes for out controllers
router.use('/authen', require('./authentication.routes.js'));
router.use('/user', require('./user.routes.js'));

router.use((req, res, next) => {
  controller.authorize(req, res, next)
});

logger.info('Server api routes loaded');

module.exports = router;
