import { before, GET, POST, PUT, route } from 'awilix-express'
import { authenticate, permission } from "../api.handler";
import TermConditionMapper from "../mapper/term-condition.mapper";

@route('/term-condition')
export default class DeviceApi {
  constructor({addTermConditionUseCase, getTermConditionUseCase, updateTermConditionUseCase}) {
    this.addTermConditionUseCase = addTermConditionUseCase;
    this.getTermConditionUseCase = getTermConditionUseCase;
    this.updateTermConditionUseCase = updateTermConditionUseCase
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
  @before([authenticate, permission])
  async addTermCondition(req, res, next) {
    try {
      const body = req.body;
      let mapper = new TermConditionMapper()
      let param = mapper.addTermCondition(body)
      const result = await this.addTermConditionUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/:id')
  @PUT()
  @before([authenticate, permission])
  async updateTermCondition(req, res, next) {
    try {
      const body = req.body;
      let mapper = new TermConditionMapper()
      let param = mapper.updateTermCondition(req.params.id, body)
      const result = await this.updateTermConditionUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
