import MenuItemSchema from './MenuItemSchema';

export default class MenuItemDao {
  constructor(logger) {
    this.logger = logger;
  }

  addMenuItem(data) {
    this.logger.info('mongoose addMenuItem');
    return MenuItemSchema.create(data);
  }

  updateMenuItem(_id, data) {
    this.logger.info('mongoose updateMenuItem');
    return MenuItemSchema.findByIdAndUpdate({_id}, {$set: data}, {new: true}).lean();
  }

  getMenuItemById(_id) {
    this.logger.info('mongoose getMenuItemById');
    return MenuItemSchema.findById(_id).lean();
  }

  getMenuItems(query) {
    this.logger.info('mongoose getMenuItems');
    this.logger.info('mongoose query: ' + JSON.stringify(query));
    return MenuItemSchema.find(query).lean();
  }

  getMenuItemsByPage(page, limit) {
    this.logger.info('mongoose getMenuItemsByPage');
    return MenuItemSchema.find({}).limit(limit).skip((page - 1) * limit).lean();
  }

  countMenuItem() {
    this.logger.info('mongoose countMenuItem');
    return MenuItemSchema.countDocuments({})
  }

  getMenuItemsQueryByPage(query, page, limit) {
    this.logger.info('mongoose getMenuItemsQueryByPage');
    return MenuItemSchema.find(query).limit(limit).skip((page - 1) * limit).lean();
  }

  countMenuItemQuery(query) {
    this.logger.info('mongoose countMenuItem');
    return MenuItemSchema.countDocuments(query)
  }
}
