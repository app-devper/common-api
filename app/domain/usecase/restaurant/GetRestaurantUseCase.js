import ApiError from '../../../presentation/ApiError';
import { general } from '../../../core/MessageProperties';

export default class GetRestaurantUseCase {
  constructor({database, logger}) {
    this.restaurantDao = database.restaurantDao();
    this.logger = logger;
  }

  async execute(param) {
    const data = await this.restaurantDao.getRestaurantById(param.id);
    if (data) {
      return data
    } else {
      throw new ApiError('Restaurant not found', general.dataNotFound)
    }
  }
}
