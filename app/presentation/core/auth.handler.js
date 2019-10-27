import jwt from 'jsonwebtoken';
import { authentication } from '../../domain/core/message.properties';
import ApiError from '../../domain/core/api.error';

export const authenticate = async (req, res, next) => {
  const { logger, config } = req.container.cradle;
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    try {
      const decoded = await jwt.verify(token, config.secret);
      logger.info('Decoded: ' + JSON.stringify(decoded));
      req.decoded = decoded['data'];
      next()
    } catch (err) {
      logger.error(err.message);
      next(new ApiError(err.message, authentication.unAuthorized))
    }
  } else {
    logger.error('Missing Authorization');
    next(new ApiError('Missing Authorization', authentication.missingAuthorization))
  }
};
