import UserDao from './user/user.dao';
import DeviceDao from './device/device.dao';
import mongoose from 'mongoose'
import UserRefDao from "./ref/user-ref.dao";

export default class Database {
  constructor({ config, logger }) {
    this.config = config;
    this.logger = logger;
  }

  userDao() {
    return new UserDao(this.logger)
  }

  deviceDao() {
    return new DeviceDao(this.logger)
  }

  userRefDao() {
    return new UserRefDao(this.logger)
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
