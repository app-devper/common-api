import ApiError from '../../ApiError';
import { general } from '../../core/error/MessageProperties';
import jwt from "jsonwebtoken";

export default class AddRestaurantUseCase {
  constructor({database, logger, config}) {
    this.config = config;
    this.restaurantDao = database.restaurantDao();
    this.logger = logger;
  }

  async execute(param) {
    const data = await this.restaurantDao.getRestaurantByEmail(param.email);
    if (data) {
      throw new ApiError('Restaurant duplicate', general.duplicateData)
    } else {
      const data = await this.restaurantDao.addRestaurant(param)
      try {
        delete data.password;
        const accessToken = await jwt.sign({data: data}, this.config.secret, {expiresIn: this.config.accessTokenTime});
        return {accessToken,status: data.status}
      } catch (err) {
        throw new ApiError(err.message, general.internalError)
      }
    }
  }
}
