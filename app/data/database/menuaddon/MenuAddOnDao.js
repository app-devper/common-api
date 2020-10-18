import MenuAddOnSchema from './MenuAddOnSchema';

export default class MenuAddOnDao {
  constructor(logger) {
    this.logger = logger;
  }

  addMenuAddOn(data) {
    this.logger.info('mongoose addMenuAddOn');
    return MenuAddOnSchema.create(data);
  }

  updateMenuAddOn(_id, data) {
    this.logger.info('mongoose updateMenuAddOn');
    return MenuAddOnSchema.findByIdAndUpdate({_id}, {$set: data}, {new: true}).lean();
  }

  getMenuAddOnById(_id) {
    this.logger.info('mongoose getMenuAddOnById');
    return MenuAddOnSchema.findById(_id).lean();
  }

  getMenuAddOns(query) {
    this.logger.info('mongoose getMenuAddOns');
    return MenuAddOnSchema.find(query).lean();
  }
}
