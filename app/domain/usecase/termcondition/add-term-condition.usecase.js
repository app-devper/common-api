export default class AddTermConditionUseCase {
  constructor({ termConditionRepository, logger }) {
    this.repository = termConditionRepository;
    this.logger = logger;
  }

  async execute(param) {
    return this.repository.addTermCondition(param.data);
  }
}
