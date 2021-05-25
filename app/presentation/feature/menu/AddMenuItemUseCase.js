export default class AddMenuItemUseCase {
  constructor({database, logger, config}) {
    this.config = config;
    this.menuItemDao = database.menuItemDao();
    this.logger = logger;
  }

  async execute(param) {
    return await this.menuItemDao.addMenuItem(param)
  }
}
