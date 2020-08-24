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
import GetInfoUseCase from "./domain/usecase/auth/get-info.usecase";
import RegisterUseCase from "./domain/usecase/auth/register.usecase";
import SubscriptionUseCase from "./domain/usecase/notification/subscription.usecase";
import NotificationRepository from "./data/repository/notification.repository";
import AddNotificationUseCase from "./domain/usecase/notification/add-notification.usecase";
import GetNotificationsUseCase from "./domain/usecase/notification/get-notifications.usecase";
import GetUnreadUseCase from "./domain/usecase/notification/get-unread.usecase";
import MarkReadUseCase from "./domain/usecase/notification/mark-read.usecase";
import TermConditionRepository from "./data/repository/term-condition.repository";
import GetTermConditionUseCase from "./domain/usecase/termcondition/get-term-condition.usecase";
import AddTermConditionUseCase from "./domain/usecase/termcondition/add-term-condition.usecase";
import UpdateTermConditionUseCase from "./domain/usecase/termcondition/update-term-condition.usecase";

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
  userRefRepository: asClass(ReferenceRepository).singleton(),
  notificationRepository: asClass(NotificationRepository).singleton(),
  termConditionRepository: asClass(TermConditionRepository).singleton()
});

// Domain Layer
container.register({
  addDeviceUseCase: asClass(AddDeviceUsecase).singleton(),

  verifyPasswordUseCase: asClass(VerifyPasswordUseCase).singleton(),
  setAuthUseCase: asClass(SetAuthUseCase).singleton(),
  verifyPinUseCase: asClass(VerifyPinUseCase).singleton(),
  logoutUseCase: asClass(LogoutUseCase).singleton(),
  keepAliveUseCase: asClass(KeepAliveUseCase).singleton(),
  getInfoUseCase: asClass(GetInfoUseCase).singleton(),
  registerUseCase: asClass(RegisterUseCase).singleton(),

  getChannelUseCase: asClass(GetChannelUsecase).singleton(),
  verifyUserUseCase: asClass(VerifyUserUsecase).singleton(),
  getCodeUseCase: asClass(GetCodeUsecase).singleton(),
  verifyCodeUseCase: asClass(VerifyCodeUsecase).singleton(),

  getUsersUseCase: asClass(GetUsersUsecase).singleton(),
  getUserUseCase: asClass(GetUserUsecase).singleton(),
  addUserUseCase: asClass(AddUserUsecase).singleton(),
  updateUserUseCase: asClass(UpdateUserUsecase).singleton(),
  removeUserUseCase: asClass(RemoveUserUsecase).singleton(),

  subscriptionUseCase: asClass(SubscriptionUseCase).singleton(),
  addNotificationUseCase: asClass(AddNotificationUseCase).singleton(),
  getNotificationsUseCase: asClass(GetNotificationsUseCase).singleton(),
  getUnreadUseCase: asClass(GetUnreadUseCase).singleton(),
  markReadUseCase: asClass(MarkReadUseCase).singleton(),

  getTermConditionUseCase: asClass(GetTermConditionUseCase).singleton(),
  addTermConditionUseCase: asClass(AddTermConditionUseCase).singleton(),
  updateTermConditionUseCase: asClass(UpdateTermConditionUseCase).singleton(),

});

// Middle Wares
container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
  swaggerMiddleware: asValue([swaggerMiddleware]),
  errorHandler: asValue(errorHandler)
});

export default container
