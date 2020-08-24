export default class TermConditionRepository {
  constructor({database}) {
    this.termConditionDao = database.termConditionDao()
  }

  addTermCondition(data) {
    return this.termConditionDao.addTermCondition(data);
  }

  updateTermCondition(id, data) {
    return this.termConditionDao.updateTermCondition(id, data)
  }

  getTermConditionById(id) {
    return this.termConditionDao.getTermConditionById(id)
  }

  getTermCondition() {
    return this.termConditionDao.getTermCondition()
  }

}
