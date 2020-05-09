import UserRefSchema from './user-ref.schema';

export default class UserRefDao {
  constructor(logger) {
    this.logger = logger;
  }

  addUserRef(user) {
    this.logger.info('mongoose addUserRef');
    return UserRefSchema.create(user);
  }

  updateUserRef(_id, user) {
    this.logger.info('mongoose updateUserRef');
    return UserRefSchema.findByIdAndUpdate({ _id }, { $set: user }, { new: true }).lean();
  }

  getUserRefById(_id) {
    this.logger.info('mongoose getUserRefById');
    return UserRefSchema.findById(_id).lean();
  }

  removeByUserId(id) {
    this.logger.info('mongoose removeByUserId');
    return UserRefSchema.deleteMany({ userId: id })
  }

  getCode(refCode) {
    this.logger.info('mongoose getCode');
    return UserRefSchema.findOne({ refCode: refCode }).lean();
  }
}
