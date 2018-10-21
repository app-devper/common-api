import mongoose from 'mongoose' // Load mongoose
import * as applicationUtils from '../../utils/app-utils'
import * as service from '../authentication/authentication.service'
import logger from '../../log/logger' // Load logger
import loggerInfo from '../../log/logger-info'
import loggerAccess from '../../log/logger-access'
import { LogModel } from '../../log/log.model'

// api
export const api = (req, res, next) => {
  logger.info('Start ==================================================================================================================');
  logger.info('validator something route url : ' + req.url);
  logger.info('validator something route method : ' + req.method);

  let bypass = ((req.url === '/authen' && req.method === 'POST') ||
    (req.url === '/authen/social' && req.method === 'POST') ||
    (req.url === '/authen/logout' && req.method === 'GET') ||
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
    let errMessage = 'Failed to connect to MongoDB';
    logger.error(errMessage);
    // Response.
    let response = applicationUtils.genResponse(req.get('dc-language'), 'OB5000036', errMessage);
    res.status(response.httpCode).send(response);
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
