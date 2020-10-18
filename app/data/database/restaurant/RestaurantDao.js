import RestaurantSchema from './RestaurantSchema';
import { ACTIVE } from "../../../domain/constant/Status";

export default class RestaurantDao {
  constructor(logger) {
    this.logger = logger;
  }

  addRestaurant(data) {
    this.logger.info('mongoose addRestaurant');
    return RestaurantSchema.create(data);
  }

  updateRestaurant(_id, data) {
    this.logger.info('mongoose updateRestaurant');
    return RestaurantSchema.findByIdAndUpdate({_id}, {$set: data}, {new: true}).lean();
  }

  getRestaurantById(_id) {
    this.logger.info('mongoose getRestaurantById');
    return RestaurantSchema.findById(_id, "-password").lean();
  }

  getRestaurantByEmail(data) {
    this.logger.info('mongoose getRestaurantByEmail');
    return RestaurantSchema.findOne({email: data}).lean();
  }

  getRestaurantsByPage(page, limit) {
    this.logger.info('mongoose getRestaurantsByPage');
    return RestaurantSchema.find({status: ACTIVE}).limit(limit).skip((page - 1) * limit).lean();
  }

  countRestaurant() {
    this.logger.info('mongoose countRestaurant');
    return RestaurantSchema.countDocuments({status: ACTIVE})
  }
}
