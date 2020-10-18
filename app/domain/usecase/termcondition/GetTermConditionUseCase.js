import ApiError from '../../../presentation/ApiError';
import { general } from '../../../core/MessageProperties';

export default class GetTermConditionUseCase {
  constructor({ database, logger }) {
    this.termConditionDao = database.termConditionDao()
    this.logger = logger;
  }

  async execute() {
    const result = await this.termConditionDao.getTermCondition();
    if (result) {
      return result
    } else {
      throw new ApiError('Data not found', general.dataNotFound)
    }
  }
}
