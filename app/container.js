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
import DeviceRepository from './data/repository/device.repository';
import ReferenceRepository from "./data/repository/reference.repository";

import GetUsersUsecase from './domain/usecase/user/get-users.usecase';
import GetUserUsecase from './domain/usecase/user/get-user.usecase';
import RemoveUserUsecase from "./domain/usecase/user/remove-user.usecase";
import UpdateUserUsecase from "./domain/usecase/user/update-user.usecase";
import AddUserUsecase from "./domain/usecase/user/add-user.usecase";

import AddDeviceUsecase from './domain/usecase/device/add-device.usecase';

import GetChannelUsecase from "./domain/usecase/otp/get-channel.usecase";
import VerifyUserUsecase from "./domain/usecase/otp/verify-user.usecase";
import VerifyCodeUsecase from "./domain/usecase/otp/verify-code.usecase";
import GetCodeUsecase from "./domain/usecase/otp/get-code.usecase";

import SetAuthUseCase from "./domain/usecase/auth/set-auth.usecase";
import VerifyPasswordUseCase from "./domain/usecase/auth/verify-password.usecase";
import VerifyPinUseCase from "./domain/usecase/auth/verify-pin.usecase";
import KeepAliveUseCase from "./domain/usecase/auth/keep-alive.usecase";
import LogoutUseCase from "./domain/usecase/auth/logout.usecase";

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
  userRefRepository: asClass(ReferenceRepository).singleton()
});

// Domain Layer
container.register({
  addDeviceUseCase: asClass(AddDeviceUsecase).singleton(),

  verifyPasswordUseCase: asClass(VerifyPasswordUseCase).singleton(),
  setAuthUseCase: asClass(SetAuthUseCase).singleton(),
  verifyPinUseCase: asClass(VerifyPinUseCase).singleton(),
  logoutUseCase: asClass(LogoutUseCase).singleton(),
  keepAliveUseCase: asClass(KeepAliveUseCase).singleton(),

  getChannelUseCase: asClass(GetChannelUsecase).singleton(),
  verifyUserUseCase: asClass(VerifyUserUsecase).singleton(),
  getCodeUseCase: asClass(GetCodeUsecase).singleton(),
  verifyCodeUseCase: asClass(VerifyCodeUsecase).singleton(),

  getUsersUseCase: asClass(GetUsersUsecase).singleton(),
  getUserUseCase: asClass(GetUserUsecase).singleton(),
  addUserUseCase: asClass(AddUserUsecase).singleton(),
  updateUserUseCase: asClass(UpdateUserUsecase).singleton(),
  removeUserUseCase: asClass(RemoveUserUsecase).singleton(),
});

// Middle Wares
container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
  swaggerMiddleware: asValue([swaggerMiddleware]),
  errorHandler: asValue(errorHandler)
});

export default container
