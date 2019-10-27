import { ALL, route } from 'awilix-express'
import request from 'request';

@route('/moviedb')
export default class MovieApi {
  constructor () {
    this.apiKey = '3fa9058382669f72dcb18fb405b7a831';
  }

  @route('/*')
  @ALL()
  async allPath (req, res, next) {
    try {
      const { logger } = req.container.cradle;
      const queries = req.query;
      queries['api_key'] = this.apiKey;
      const path = req.path.replace('/moviedb', '');
      const url = `https://api.themoviedb.org/3${path}`;
      logger.info('queries: ' + JSON.stringify(queries));
      logger.info('url: ' + url);
      request({
        url: url,
        qs: queries,
        method: req.method,
        json: req.body
      }).pipe(res);
    } catch (err) {
      next(err)
    }
  }
}
