export default class AddMenuAddOnUseCase {
  constructor({database, logger, config}) {
    this.config = config;
    this.menuAddOnDao = database.menuAddOnDao();
    this.logger = logger;
  }

  async execute(param) {
    return await this.menuAddOnDao.addMenuAddOn(param)
  }
}
