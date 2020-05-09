import jwt from 'jsonwebtoken';
import { authentication, general } from '../domain/core/message.properties';
import ApiError from '../domain/core/api.error';
import { ADMIN } from '../domain/constant/user.role';
import { header } from '../domain/constant/constants';

export const authenticate = async (req, res, next) => {
  const { logger, config } = req.container.cradle;
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    try {
      const decoded = await jwt.verify(token, config.secret);
      // logger.info('Decoded Data: ' + JSON.stringify(decoded));
      req.decoded = decoded['data'];
      next()
    } catch (err) {
      next(new ApiError(err.message, authentication.unAuthorized))
    }
  } else {
    next(new ApiError('Missing Authorization', authentication.missingAuthorization))
  }
};

export const verifyAction = async (req, res, next) => {
  const { logger, config } = req.container.cradle;
  let token = req.headers['x-action-token'];
  if (token) {
    try {
      const decoded = await jwt.verify(token, config.secret);
      // logger.info('Decoded Data: ' + JSON.stringify(decoded));
      req.userRefId = decoded["data"];
      next()
    } catch (err) {
      logger.error(err.message);
      next(new ApiError(err.message, authentication.unAuthorized))
    }
  } else {
    next(new ApiError('Missing Action Token', authentication.missingAuthorization))
  }
};

export const permission = (req, res, next) => {
  if (req.decoded.role === ADMIN) {
    next()
  } else {
    next(new ApiError('Forbidden', authentication.forbidden))
  }
};

export const errorHandler = (err, req, res, next) => {
  const { logger } = req.container.cradle;
  let response = err.response;
  const language = req.headers[header.language] || 'en';
  if (!response) {
    logger.error(err);
    response = general.error;
  }
  logger.error(err.message);
  res.status(response.httpCode).send({
    type: err.name,
    resCode: response.resCode,
    resMessage: response[language],
    devMessage: err.message,
    stack: err.stack
  });
};

