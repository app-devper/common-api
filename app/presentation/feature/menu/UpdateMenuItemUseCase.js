export default class UpdateMenuItemUseCase {
  constructor({database, logger}) {
    this.menuItemDao = database.menuItemDao();
    this.logger = logger;
  }

  async execute(param) {
    return await this.menuItemDao.updateMenuItem(param.id, param.data)
  }
}
