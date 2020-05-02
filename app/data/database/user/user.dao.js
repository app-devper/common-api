import UserSchema from './user.schema';

export default class UserDao {
  constructor(logger) {
    this.logger = logger;
  }

  addUser(user) {
    this.logger.info('mongoose addUser');
    return UserSchema.create(user);
  }

  updateUser(_id, user) {
    this.logger.info('mongoose updateUser');
    return UserSchema.findByIdAndUpdate({ _id }, { $set: user }, { new: true }).lean();
  }

  getUserById(_id) {
    this.logger.info('mongoose getUserById');
    return UserSchema.findById(_id, '-password -countLoginFailed -timeToUnlock').lean();
  }

  removeUser(_id) {
    this.logger.info('mongoose removeUser');
    return UserSchema.findOneAndRemove({ _id })
  }

  getUsers() {
    this.logger.info('mongoose getUser');
    return UserSchema.find({}, '-password -countLoginFailed -timeToUnlock').lean();
  }

  getUserByUsername(username) {
    this.logger.info('mongoose getUserByUsername');
    return UserSchema.findOne({ username: username }).lean();
  }

  getUserByCriteria(criteria) {
    this.logger.info('mongoose getUserByCriteria');
    return UserSchema.findOne(criteria, '-password -countLoginFailed -timeToUnlock')
  }

  getUserListByCriteria(criteria) {
    this.logger.info('mongoose getUserByCriteria');
    return UserSchema.find(criteria, '-password -countLoginFailed -timeToUnlock').lean();
  }

  verifyUser(username, password) {
    return UserSchema.findOne({ username, password }).lean();
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
