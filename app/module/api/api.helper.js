import { LogModel } from '../../log/log.model';
import loggerInfo from '../../log/logger-info';
import { resMessage } from '../../common/message.properties';
import * as service from '../auth/auth.service';
import { genResponse } from '../../utils/utils';

export const handlerRequest = async (req, res, next) => {
  if (req.bypass) {
    return next()
  }
  const token = req.headers.authorization;
  let result = null;
  if (token && token.startsWith('Bearer ')) {
    result = await service.checkJwt(req);
  } else {
    result = await service.checkToken(req)
  }
  if (result) {
    return sendResponse(req, res, result)
  } else {
    next()
  }
};

export const basicAuth = async (req, res, next) => {
  // make authenticate path public
  if (req.bypass) {
    return next();
  }
  // check for basic auth header
  let token = req.headers.authorization;
  if (token.startsWith('Basic ')) {
    // Remove Basic from string
    token = token.slice(6, token.length);
  }
  if (token) {
    // verify auth credentials
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const result = await service.authenticate(req, username, password);
    if (result) {
      return sendResponse(req, res, result)
    } else {
      return next();
    }
  } else {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }
};

export const sendResponse = (req, res, result) => {
  const logModel = new LogModel();
  logModel.setResponse(req, result);
  loggerInfo.info(logModel.getInfoLog());
  res.status(result.status).send(result)
};

export const sendErrorResponse = (req, res, err) => {
  const result = genResponse(req.language, resMessage.general.error, err.message);
  const logModel = new LogModel();
  logModel.setResponse(req, result);
  loggerInfo.info(logModel.getInfoLog());
  res.status(result.status).send(result)
};
