import { before, GET, route } from 'awilix-express'
import { authenticate } from '../core/auth.handler';

@route('/user')
export default class UserApi {
  constructor ({ getUsersUseCase, getUserUseCase }) {
    this.getUsersUseCase = getUsersUseCase;
    this.getUserUseCase = getUserUseCase
  }

  @GET()
  @before([authenticate])
  async getUsers (req, res, next) {
    try {
      const page = parseInt(req.query['page'], 10) || 1;
      const limit = parseInt(req.query['limit'], 10) || 10;
      const result = await this.getUsersUseCase.execute({ page, limit });
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/:id')
  @GET()
  @before([authenticate])
  async getUser (req, res, next) {
    try {
      const result = await this.getUserUseCase.execute({ id: req.params.id });
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
