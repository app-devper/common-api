import ApiError from '../../ApiError';
import { general } from '../../core/error/MessageProperties';

export default class GetMenuItemUseCase {
  constructor({database, logger}) {
    this.menuItemDao = database.menuItemDao();
    this.menuAddOnDao = database.menuAddOnDao();
    this.logger = logger;
  }

  async execute(param) {
    const data = await this.menuItemDao.getMenuItemById(param.menuItemId);
    if (data) {
      data.addOns = await this.menuAddOnDao.getMenuAddOns({menuItemId: param.menuItemId})
      return data
    } else {
      throw new ApiError('MenuItem not found', general.dataNotFound)
    }
  }
}
