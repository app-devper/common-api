import { before, GET, POST, PUT, route } from 'awilix-express'
import RestaurantMapper from "../feature/restaurant/RestaurantMapper";

@route('/user-restaurant')
export default class UserRestaurantController {
  constructor(
    {
      getRestaurantsUseCase,
      getRestaurantUseCase,
    }
  ) {
    this.getRestaurantsUseCase = getRestaurantsUseCase;
    this.getRestaurantUseCase = getRestaurantUseCase;
  }

  @GET()
  async getRestaurants(req, res, next) {
    try {
      const mapper = new RestaurantMapper()
      const param = mapper.getPaging(req.query)
      const result = await this.getRestaurantsUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/:id')
  @GET()
  async getRestaurant(req, res, next) {
    try {
      const mapper = new RestaurantMapper()
      const param = mapper.getRestaurantId(req.params.id)
      const result = await this.getRestaurantUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

}
