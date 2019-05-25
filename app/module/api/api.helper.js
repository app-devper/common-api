import { LogModel } from '../../log/log.model';
import loggerInfo from '../../log/logger-info';
import * as applicationUtils from '../../utils/app-utils';
import { resMessage } from '../../common/message.properties';
import * as service from '../authentication/authentication.service';

export const handlerRequest = async (req, res, next) => {
  if (req.bypass) {
    return next()
  }
  let result = await service.checkToken(req);
  if (result) {
    return sendResponse(req, res, result)
  }
  next()
};

export const basicAuth = async (req, res, next) => {
  // make authenticate path public
  if (req.bypass) {
    return next();
  }
  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  const result = await service.authenticate(req, username, password);
  if (result) {
    return sendResponse(req, res, result)
  }
  next();
};

export const sendResponse = (req, res, result) => {
  let logModel = new LogModel();
  logModel.setResponse(req, result);
  loggerInfo.info(logModel.getInfoLog());
  res.status(result.status).send(result)
};

export const sendErrorResponse = (req, res, err) => {
  let result = applicationUtils.genResponse(req.language, resMessage.general.error, err.message);
  let logModel = new LogModel();
  logModel.setResponse(req, result);
  loggerInfo.info(logModel.getInfoLog());
  res.status(result.status).send(result)
};
