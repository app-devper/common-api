import ReferenceSchema from './ReferenceSchema';

export default class ReferenceDao {
  constructor(logger) {
    this.logger = logger;
  }

  addUserRef(user) {
    this.logger.info('mongoose addUserRef');
    return ReferenceSchema.create(user);
  }

  updateUserRef(_id, user) {
    this.logger.info('mongoose updateUserRef');
    return ReferenceSchema.findByIdAndUpdate({_id}, {$set: user}, {new: true}).lean();
  }

  getUserRefById(_id) {
    this.logger.info('mongoose getUserRefById');
    return ReferenceSchema.findById(_id).lean();
  }

  removeByUserId(id) {
    this.logger.info('mongoose removeByUserId');
    return ReferenceSchema.deleteMany({userId: id})
  }

  getCode(refCode) {
    this.logger.info('mongoose getCode');
    return ReferenceSchema.findOne({refCode: refCode}).lean();
  }
}
