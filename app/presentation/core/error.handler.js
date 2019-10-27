import { header } from '../../domain/constant/constants';
import { general } from '../../domain/core/message.properties';

export const errorHandler = (err, req, res, next) => {
  const { logger } = req.container.cradle;
  let response = err.response;
  const language = req.headers[header.language] || 'en';
  if (!response) {
    logger.error(err);
    response = general.error;
  }
  res.status(response.httpCode).send({
    type: err.name,
    resCode: response.resCode,
    resMessage: response[language],
    devMessage: err.message,
    stack: err.stack
  });
};
