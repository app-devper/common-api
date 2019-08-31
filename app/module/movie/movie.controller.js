import * as service from './movie.service'

export const handleReceive = (req, res) => {
  service.callApiMovie(req, res);
};
