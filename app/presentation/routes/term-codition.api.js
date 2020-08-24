import { before, GET, POST, route } from 'awilix-express'
import { authenticate } from "../api.handler";

@route('/term-condition')
export default class DeviceApi {
  constructor({addTermConditionUseCase, getTermConditionUseCase}) {
    this.addTermConditionUseCase = addTermConditionUseCase;
    this.getTermConditionUseCase = getTermConditionUseCase;
  }

  @GET()
  @before([authenticate])
  async getTermCondition(req, res, next) {
    try {
      const result = await this.getTermConditionUseCase.execute();
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @POST()
  async addTermCondition(req, res, next) {
    try {
      const body = req.body;
      const result = await this.addTermConditionUseCase.execute(body);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
