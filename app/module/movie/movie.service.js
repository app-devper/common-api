/* eslint-disable max-len */

import request from 'request';
import logger from "../../logger/logger";

const apiKey = '3fa9058382669f72dcb18fb405b7a831';

export const callApiMovie = (req, res) => {
  const queries = req.query;
  queries["api_key"] = apiKey;
  logger.info('queries: ' + JSON.stringify(queries));
  logger.info('body: ' + JSON.stringify(req.body));
  request({
    url: `https://api.themoviedb.org/3${req.url}`,
    qs: queries,
    method: req.method,
    json: req.body
  }).pipe(res);
};

