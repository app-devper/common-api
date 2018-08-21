import logger from '../../utils/logger' // Load logger
import config from '../../config/config'
import mongoose from 'mongoose' // Load mongoose
import * as applicationUtils from '../../utils/app-utils'
import * as service from '../authentication/authentication.service'
import loggerInfo from '../../utils/logger-info'
import loggerAccess from '../../utils/logger-access'
import {LogModel} from '../../config/log/log.model'

// api
export const api = (req, res, next) => {
  logger.info('Start ==================================================================================================================');
  logger.info('validator something route url : ' + req.url);
  logger.info('validator something route method : ' + req.method);

  let bypass = ((req.url === '/authen' && req.method === 'POST') ||
    (req.url === '/authen/social' && req.method === 'POST')||
    (req.url === '/authen/logout' && req.method === 'GET')||
    (req.url === '/user/register' && req.method === 'POST')
  );

  let authentication = () => {
    if (bypass) {
      next()
    } else {
      service.authenticationApi(req, (response) => {
        if (response) {
          let logModel = new LogModel();
          logModel.setRequest(req);
          loggerAccess.info(logModel.getAccessLog());
          logModel.setResponse(response);
          loggerInfo.info(logModel.getInfoLog());
          res.status(response.httpCode).send(response)
        } else {
          next()
        }
      })
    }
  };

  let connectionStatus = mongoose.connection.readyState;
  if (connectionStatus === 0) {
    mongoose.connect(config.db, {keepAlive: 300000, connectTimeoutMS: 30000}, (err) => {
      if (err) {
        logger.error('Failed to reconnect to MongoDB');
        logger.error(err.message);
        let response = applicationUtils.genResponse(req.get('dc-language'), 'CM5000036', err.message);
        res.status(response.httpCode).send(response)
      } else {
        logger.info('Reconnected to MongoDB Successfully....');
        authentication()
      }
    })
  } else {
    authentication()
  }
};

// authorize
export const authorize = (req, res, next) => {
  let logModel = new LogModel();
  logModel.setRequest(req);
  loggerAccess.info(logModel.getAccessLog());
  let response = applicationUtils.genResponse(req.get('dc-language'), 'CM4040000', 'Not found');
  logModel.setResponse(response);
  loggerInfo.info(logModel.getInfoLog());
  return res.status(response.httpCode).send(response)
};
