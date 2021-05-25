export default class UpdateRestaurantUseCase {
  constructor({database, logger}) {
    this.restaurantDao = database.restaurantDao();
    this.logger = logger;
  }

  async execute(param) {
    const data = await this.restaurantDao.updateRestaurant(param.id, param.data)
    delete data.password
    return data
  }
}
