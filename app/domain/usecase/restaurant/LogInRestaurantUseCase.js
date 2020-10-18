import { ACTIVE } from '../../constant/Status';
import ApiError from '../../../presentation/ApiError';
import { auth, general } from '../../../core/MessageProperties';
import jwt from 'jsonwebtoken';

export default class LogInRestaurantUseCase {
  constructor({database, logger, config}) {
    this.config = config;
    this.restaurantDao = database.restaurantDao();
    this.logger = logger;
  }

  async execute(param) {
    let data = await this.restaurantDao.getRestaurantByEmail(param.email);
    if (!data) {
      throw new ApiError('Invalid restaurant', auth.invalidData)
    }
    const isPass = param.password === data.password
    if (!isPass) {
      throw new ApiError('Invalid password', auth.invalidData)
    } else {
      try {
        delete data.password;
        const accessToken = await jwt.sign({data: data}, this.config.secret, {expiresIn: "30d"});
        return {accessToken, status: data.status}
      } catch (err) {
        throw new ApiError(err.message, general.error)
      }
    }
  }
}
