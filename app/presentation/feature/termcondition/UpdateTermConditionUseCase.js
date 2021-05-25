export default class UpdateTermConditionUseCase {
  constructor({database, logger}) {
    this.termConditionDao = database.termConditionDao()
    this.logger = logger;
  }

  async execute(param) {
    return this.termConditionDao.updateTermCondition(param.id, param.data);
  }
}
