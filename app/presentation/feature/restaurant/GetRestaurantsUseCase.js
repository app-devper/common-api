export default class GetRestaurantsUseCase {
  constructor({database, logger}) {
    this.restaurantDao = database.restaurantDao();
    this.logger = logger;
  }

  async execute(param) {
    const total = await this.restaurantDao.countRestaurant();
    let results = [];
    if (param.page > 0) {
      results = await this.restaurantDao.getRestaurantsByPage(param.page, param.limit);
    }
    const totalPages = Math.ceil(total / param.limit);
    return {results, total, page: param.page, totalPages}
  }
}
