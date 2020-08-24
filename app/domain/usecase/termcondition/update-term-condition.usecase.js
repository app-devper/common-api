export default class UpdateTermConditionUseCase {
  constructor({termConditionRepository, logger}) {
    this.repository = termConditionRepository;
    this.logger = logger;
  }

  async execute(param) {
    return this.repository.updateTermCondition(param.id, param.data);
  }
}
