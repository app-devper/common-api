export default class AddTermConditionUseCase {
  constructor({ database, logger }) {
    this.termConditionDao = database.termConditionDao()
    this.logger = logger;
  }

  async execute(param) {
    return this.termConditionDao.addTermCondition(param.data);
  }
}
