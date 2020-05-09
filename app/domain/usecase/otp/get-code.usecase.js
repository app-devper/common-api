export default class GetCodeUsecase {
  constructor({ userRefRepository, logger, config }) {
    this.config = config;
    this.repository = userRefRepository;
    this.logger = logger;
  }

  async execute(param) {
    let ref = await this.repository.getCode(param.refCode);
    if (ref) {
      return ref.code
    } else {
      return ""
    }
  }
}
