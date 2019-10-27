import { asClass, asFunction, asValue, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express'
import config from 'config';
import { logger } from './core/logger/logger'
import Application from './application';
import Server from './presentation/server';
import { router } from './presentation/api.router'
import { errorHandler } from './presentation/core/error.handler';
import Database from './data/database/database';
import UserRepository from './data/repository/user.repository';
import LoginUseCase from './domain/usecase/auth/login.usecase';
import GetUsersUseCase from './domain/usecase/user/getusers.usecase';
import GetUserUseCase from './domain/usecase/user/getuser.usecase';
import DeviceRepository from './data/repository/device.repository';
import AddDeviceUseCase from './domain/usecase/device/adddevice.usecase';

const swaggerMiddleware = require('./presentation/swagger/swagger.middleware');

const container = createContainer();

// App
container.register({
  app: asClass(Application).singleton(),
  server: asClass(Server).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(logger),
  config: asValue(config)
});

// Data Layer
container.register({
  database: asClass(Database).singleton(),
  userRepository: asClass(UserRepository).singleton(),
  deviceRepository: asClass(DeviceRepository).singleton()
});

// Domain Layer
container.register({
  loginUseCase: asClass(LoginUseCase).singleton(),
  getUsersUseCase: asClass(GetUsersUseCase).singleton(),
  getUserUseCase: asClass(GetUserUseCase).singleton(),
  addDeviceUseCase: asClass(AddDeviceUseCase).singleton()
});

// Middle Wares
container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
  swaggerMiddleware: asValue([swaggerMiddleware]),
  errorHandler: asValue(errorHandler)
});

export default container
