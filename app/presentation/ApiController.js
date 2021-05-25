import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import { loadControllers } from 'awilix-express'
import jwt from "jsonwebtoken";
import ApiError from "./ApiError";
import { general } from "./core/error/MessageProperties";
import { ADMIN } from "../core/constant/Role";
import { header } from "../core/constant/Constants";

export const router = ({containerMiddleware, swaggerMiddleware}) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter.use(methodOverride('X-HTTP-Method-Override'))
  apiRouter.use(cors())
  apiRouter.use(bodyParser.json())
  apiRouter.use(compression())
  apiRouter.use(containerMiddleware)
  apiRouter.use('/docs', swaggerMiddleware);
  apiRouter.use(loadControllers('routes/*.js', {cwd: __dirname}));

  router.use('/api', apiRouter);
  router.use(handlerError);
  router.use(serviceNotFound);

  return router;
};

export const authenticate = async (req, res, next) => {
  const {logger, config} = req.container.cradle;
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
      next(new ApiError(err.message, general.tokenInvalid))
    }
  } else {
    next(new ApiError('Missing Authorization', general.missingAuthorization))
  }
};

export const authRestaurant = async (req, res, next) => {
  const {logger, config} = req.container.cradle;
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
      next(new ApiError(err.message, general.tokenInvalid))
    }
  } else {
    next(new ApiError('Missing Authorization', general.missingAuthorization))
  }
};

export const verifyAction = async (req, res, next) => {
  const {logger, config} = req.container.cradle;
  let token = req.headers['x-action-token'];
  if (token) {
    try {
      const decoded = await jwt.verify(token, config.secret);
      logger.info('Decoded Data: ' + JSON.stringify(decoded));
      req.userRefId = decoded["data"];
      next()
    } catch (err) {
      logger.error(err);
      next(new ApiError(err.message, general.actionTokenInvalid))
    }
  } else {
    next(new ApiError('Missing Action Token', general.missingAuthorization))
  }
};

export const permission = (req, res, next) => {
  if (req.decoded.role === ADMIN) {
    next()
  } else {
    next(new ApiError('Forbidden', general.forbidden))
  }
};

const handlerError = (err, req, res, next) => {
  const {logger} = req.container.cradle;
  const language = req.headers[header.language] || 'en';
  let response = err.response;
  if (!response) {
    logger.error(err);
    response = general.internalError;
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

const serviceNotFound = (req, res) => {
  let serviceNotFound = general.serviceNotFound
  const language = req.headers[header.language] || 'en';
  const {logger} = req.container.cradle;
  logger.info('Service Not found.');
  res.status(serviceNotFound.httpCode).send({
    type: "ApiError",
    resCode: serviceNotFound.resCode,
    resMessage: serviceNotFound[language],
    devMessage: "Service Not found."
  })
};
