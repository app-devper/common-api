import TermConditionSchema from './term-condition.schema';

export default class TermConditionDao {
  constructor(logger) {
    this.logger = logger;
  }

  addTermCondition(data) {
    this.logger.info('mongoose addTermCondition');
    return TermConditionSchema.create(data);
  }

  updateTermCondition(_id, data) {
    this.logger.info('mongoose updateTermCondition');
    return TermConditionSchema.findByIdAndUpdate({ _id }, { $set: data }, { new: true }).lean();
  }

  getTermConditionById(_id) {
    this.logger.info('mongoose getTermConditionById');
    return TermConditionSchema.findById(_id).lean();
  }

  getTermCondition() {
    this.logger.info('mongoose getTermCondition');
    return TermConditionSchema.findOne().sort({ _id: -1 }).lean();
  }

}
