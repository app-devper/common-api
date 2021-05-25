import { before, GET, POST, PUT, route } from 'awilix-express'
import { authRestaurant } from '../ApiController';
import RestaurantMapper from "../feature/restaurant/RestaurantMapper";

@route('/restaurant')
export default class RestaurantController {
  constructor(
    {
      getRestaurantUseCase,
      updateRestaurantUseCase,
      logInRestaurantUseCase,
      addRestaurantUseCase
    }
  ) {
    this.addRestaurantUseCase = addRestaurantUseCase;
    this.getRestaurantUseCase = getRestaurantUseCase;
    this.updateRestaurantUseCase = updateRestaurantUseCase;
    this.logInRestaurantUseCase = logInRestaurantUseCase
  }

  @route('/signup')
  @POST()
  async signup(req, res, next) {
    try {
      const mapper = new RestaurantMapper()
      const param = mapper.loginBody(req.body)
      const result = await this.addRestaurantUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/login')
  @POST()
  async login(req, res, next) {
    try {
      const mapper = new RestaurantMapper()
      const param = mapper.loginBody(req.body)
      const result = await this.logInRestaurantUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/info')
  @GET()
  @before([authRestaurant])
  async getRestaurantInfo(req, res, next) {
    try {
      const mapper = new RestaurantMapper()
      const param = mapper.getRestaurantId(req.decoded._id)
      const result = await this.getRestaurantUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/info')
  @PUT()
  @before([authRestaurant])
  async putRestaurant(req, res, next) {
    try {
      const mapper = new RestaurantMapper()
      const body = mapper.getRestaurantBody(req.body)
      const param = {id: req.decoded._id, data: body.user}
      const result = await this.updateRestaurantUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

}
