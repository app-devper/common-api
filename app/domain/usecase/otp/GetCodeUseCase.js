export default class GetCodeUseCase {
  constructor({ database, logger, config }) {
    this.config = config;
    this.referenceDao = database.referenceDao();
    this.logger = logger;
  }

  async execute(param) {
    let ref = await this.referenceDao.getCode(param.refCode);
    if (ref) {
      return ref.code
    } else {
      return ""
    }
  }
}
