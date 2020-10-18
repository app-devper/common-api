import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import { loadControllers } from 'awilix-express'
import jwt from "jsonwebtoken";
import ApiError from "./ApiError";
import { auth, general } from "../core/MessageProperties";
import { ADMIN } from "../domain/constant/Role";
import { header } from "../domain/constant/Constants";

export const router = ({ containerMiddleware, swaggerMiddleware }) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);

  apiRouter.use(loadControllers('routes/*.js', { cwd: __dirname }));

  router.use('/api', apiRouter);
  router.use(errorHandler);

  return router;
};

export const authenticate = async (req, res, next) => {
  const { logger, config } = req.container.cradle;
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    try {
      const decoded = await jwt.verify(token, config.secret);
      logger.info('Decoded Data: ' + JSON.stringify(decoded));
      req.decoded = decoded['data'];
      next()
    } catch (err) {
      logger.error(err);
      next(new ApiError(err.message, auth.tokenInvalid))
    }
  } else {
    next(new ApiError('Missing Authorization', auth.missingAuthorization))
  }
};

export const authRestaurant = async (req, res, next) => {
  const { logger, config } = req.container.cradle;
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    try {
      const decoded = await jwt.verify(token, config.secret);
      logger.info('Decoded Data: ' + JSON.stringify(decoded));
      req.decoded = decoded['data'];
      next()
    } catch (err) {
      logger.error(err);
      next(new ApiError(err.message, auth.tokenInvalid))
    }
  } else {
    next(new ApiError('Missing Authorization', auth.missingAuthorization))
  }
};

export const verifyAction = async (req, res, next) => {
  const { logger, config } = req.container.cradle;
  let token = req.headers['x-action-token'];
  if (token) {
    try {
      const decoded = await jwt.verify(token, config.secret);
      logger.info('Decoded Data: ' + JSON.stringify(decoded));
      req.userRefId = decoded["data"];
      next()
    } catch (err) {
      logger.error(err);
      next(new ApiError(err.message, auth.actionTokenInvalid))
    }
  } else {
    next(new ApiError('Missing Action Token', auth.missingAuthorization))
  }
};

export const permission = (req, res, next) => {
  if (req.decoded.role === ADMIN) {
    next()
  } else {
    next(new ApiError('Forbidden', auth.forbidden))
  }
};

const errorHandler = (err, req, res, next) => {
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
