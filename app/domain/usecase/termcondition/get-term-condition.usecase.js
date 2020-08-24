import ApiError from '../../core/api.error';
import { general } from '../../core/message.properties';

export default class GetTermConditionUseCase {
  constructor({ termConditionRepository, logger }) {
    this.repository = termConditionRepository;
    this.logger = logger;
  }

  async execute() {
    const result = await this.repository.getTermCondition();
    if (result) {
      return result
    } else {
      throw new ApiError('Data not found', general.dataNotFound)
    }
  }
}
