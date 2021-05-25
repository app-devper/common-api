export default class UpdateMenuAddOnUseCase {
  constructor({database, logger, config}) {
    this.config = config;
    this.menuAddOnDao = database.menuAddOnDao();
    this.logger = logger;
  }

  async execute(param) {
    return await this.menuAddOnDao.updateMenuAddOn(param.id, param.data)
  }
}
