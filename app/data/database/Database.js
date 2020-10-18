import mongoose from 'mongoose'
import UserDao from './user/UserDao';
import DeviceDao from './device/DeviceDao';
import ReferenceDao from "./reference/ReferenceDao";
import PushDeviceDao from "./subscription/PushDeviceDao";
import NotificationDao from "./notification/NotificationDao";
import TermConditionDao from "./termcodition/TermConditionDao";
import RestaurantDao from "./restaurant/RestaurantDao";
import MenuItemDao from "./menuitem/MenuItemDao";
import MenuAddOnDao from "./menuaddon/MenuAddOnDao";

export default class Database {
  constructor({config, logger}) {
    this.config = config;
    this.logger = logger;
  }

  userDao() {
    return new UserDao(this.logger)
  }

  deviceDao() {
    return new DeviceDao(this.logger)
  }

  referenceDao() {
    return new ReferenceDao(this.logger)
  }

  pushDeviceDao() {
    return new PushDeviceDao(this.logger)
  }

  notificationDao() {
    return new NotificationDao(this.logger)
  }

  termConditionDao() {
    return new TermConditionDao(this.logger)
  }

  restaurantDao() {
    return new RestaurantDao(this.logger)
  }

  menuItemDao() {
    return new MenuItemDao(this.logger)
  }

  menuAddOnDao() {
    return new MenuAddOnDao(this.logger)
  }

  connect() {
    const db = mongoose.connection;
    mongoose.connect(this.config.db, this.config.options);
    db.on('connecting', () => {
      this.logger.info('connecting to MongoDB...')
    });

    db.on('error', (error) => {
      this.logger.error('Could not connect to MongoDB!');
      this.logger.error(error.message);
      mongoose.disconnect()
    });

    db.on('connected', () => {
      this.logger.info('MongoDB connected!')
    });

    db.once('open', () => {
      this.logger.info('MongoDB connection opened!')
    });

    db.on('reconnected', () => {
      this.logger.info('MongoDB reconnected!')
    });

    db.on('disconnected', () => {
      this.logger.info('MongoDB disconnected!')
    });

    return db
  }
}
