import { asClass, asFunction, asValue, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express'
import config from 'config';
import { logger } from './core/logger/logger'
import Application from './application';
import Server from './presentation/server';
import { router } from './presentation/api.router'
import { errorHandler } from './presentation/api.handler';
import Database from './data/database/database';
import UserRepository from './data/repository/user.repository';
import LoginUsecase from './domain/usecase/auth/login.usecase';
import GetUsersUsecase from './domain/usecase/user/get-users.usecase';
import GetUserUsecase from './domain/usecase/user/get-user.usecase';
import DeviceRepository from './data/repository/device.repository';
import AddDeviceUsecase from './domain/usecase/device/add-device.usecase';
import UpdateUserUsecase from "./domain/usecase/user/update-user.usecase";
import AddUserUsecase from "./domain/usecase/user/add-user.usecase";
import GetChannelUsecase from "./domain/usecase/auth/get-channel.usecase";
import VerifyUserUsecase from "./domain/usecase/auth/verify-user.usecase";
import UserRefRepository from "./data/repository/user-ref.repository";
import VerifyCodeUsecase from "./domain/usecase/auth/verify-code.usecase";
import SetPasswordUsecase from "./domain/usecase/auth/set-password.usecase";
import VerifyPasswordUsecase from "./domain/usecase/auth/verify-password.usecase";

const swaggerMiddleware = require('./swagger/swagger.middleware');

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
  deviceRepository: asClass(DeviceRepository).singleton(),
  userRefRepository: asClass(UserRefRepository).singleton()
});

// Domain Layer
container.register({
  loginUseCase: asClass(LoginUsecase).singleton(),
  getChannelUseCase: asClass(GetChannelUsecase).singleton(),
  verifyUserUseCase: asClass(VerifyUserUsecase).singleton(),
  verifyCodeUseCase: asClass(VerifyCodeUsecase).singleton(),
  verifyPasswordUseCase: asClass(VerifyPasswordUsecase).singleton(),
  setPasswordUseCase: asClass(SetPasswordUsecase).singleton(),
  getUsersUseCase: asClass(GetUsersUsecase).singleton(),
  getUserUseCase: asClass(GetUserUsecase).singleton(),
  addDeviceUseCase: asClass(AddDeviceUsecase).singleton(),
  addUserUseCase: asClass(AddUserUsecase).singleton(),
  updateUserUseCase: asClass(UpdateUserUsecase).singleton()
});

// Middle Wares
container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
  swaggerMiddleware: asValue([swaggerMiddleware]),
  errorHandler: asValue(errorHandler)
});

export default container
