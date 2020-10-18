import UserSchema from './UserSchema';

export default class UserDao {
  constructor(logger) {
    this.logger = logger;
  }

  addUser(data) {
    this.logger.info('mongoose addUser');
    return UserSchema.create(data);
  }

  updateUser(_id, data) {
    this.logger.info('mongoose updateUser');
    return UserSchema.findByIdAndUpdate({_id}, {$set: data}, {new: true}).lean();
  }

  getUserById(_id) {
    this.logger.info('mongoose getUserById');
    return UserSchema.findById(_id, '-password -countLoginFailed -timeToUnlock').lean();
  }

  removeUser(_id) {
    this.logger.info('mongoose removeUser');
    return UserSchema.findOneAndRemove({_id})
  }

  getUserByUsername(data) {
    this.logger.info('mongoose getUserByUsername');
    return UserSchema.findOne({username: data}).lean();
  }

  getUsersByPage(page, limit) {
    this.logger.info('mongoose getUser');
    return UserSchema.find({}, '-password -countLoginFailed -timeToUnlock').limit(limit).skip((page - 1) * limit).lean();
  }

  countUser() {
    this.logger.info('mongoose countUser');
    return UserSchema.countDocuments({})
  }
}
