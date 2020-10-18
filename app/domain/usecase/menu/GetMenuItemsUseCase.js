export default class GetMenuItemsUseCase {
  constructor({database, logger}) {
    this.menuItemDao = database.menuItemDao();
    this.logger = logger;
  }

  async execute(param) {
    return await this.menuItemDao.getMenuItems(param);
  }
}
