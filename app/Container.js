import { asClass, asFunction, asValue, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express'
import config from 'config';
import { logger } from './core/logger/Logger'
import Application from './Application';
import Server from './presentation/Server';
import { router } from './presentation/ApiController'

import Database from './data/database/Database';

import GetUsersUseCase from './domain/usecase/user/GetUsersUseCase';
import GetUserUseCase from './domain/usecase/user/GetUserUseCase';
import RemoveUserUseCase from "./domain/usecase/user/RemoveUserUseCase";
import UpdateUserUseCase from "./domain/usecase/user/UpdateUserUseCase";
import AddUserUseCase from "./domain/usecase/user/AddUserUseCase";

import AddDeviceUseCase from './domain/usecase/device/AddDeviceUseCase';

import GetChannelUseCase from "./domain/usecase/otp/GetChannelUseCase";
import VerifyUserUseCase from "./domain/usecase/otp/VerifyUserUseCase";
import VerifyCodeUseCase from "./domain/usecase/otp/VerifyCodeUseCase";
import GetCodeUseCase from "./domain/usecase/otp/GetCodeUseCase";

import SetAuthUseCase from "./domain/usecase/auth/SetAuthUseCase";
import VerifyPasswordUseCase from "./domain/usecase/auth/VerifyPasswordUseCase";
import VerifyPinUseCase from "./domain/usecase/auth/VerifyPinUseCase";
import KeepAliveUseCase from "./domain/usecase/auth/KeepAliveUseCase";
import LogoutUseCase from "./domain/usecase/auth/LogoutUseCase";
import ActionInfoUseCase from "./domain/usecase/auth/ActionInfoUseCase";
import RegisterUseCase from "./domain/usecase/auth/RegisterUseCase";
import SubscriptionUseCase from "./domain/usecase/notification/SubscriptionUseCase";
import AddNotificationUseCase from "./domain/usecase/notification/AddNotificationUseCase";
import GetNotificationsUseCase from "./domain/usecase/notification/GetNotificationsUseCase";
import GetUnreadUseCase from "./domain/usecase/notification/GetUnreadUseCase";
import MarkReadUseCase from "./domain/usecase/notification/MarkReadUseCase";

import GetTermConditionUseCase from "./domain/usecase/termcondition/GetTermConditionUseCase";
import AddTermConditionUseCase from "./domain/usecase/termcondition/AddTermConditionUseCase";
import UpdateTermConditionUseCase from "./domain/usecase/termcondition/UpdateTermConditionUseCase";

import LogInRestaurantUseCase from "./domain/usecase/restaurant/LogInRestaurantUseCase";
import GetRestaurantsUseCase from "./domain/usecase/restaurant/GetRestaurantsUseCase";
import GetRestaurantUseCase from "./domain/usecase/restaurant/GetRestaurantUseCase";
import AddRestaurantUseCase from "./domain/usecase/restaurant/AddRestaurantUseCase";
import UpdateRestaurantUseCase from "./domain/usecase/restaurant/UpdateRestaurantUseCase";

import AddMenuItemUseCase from "./domain/usecase/menu/AddMenuItemUseCase";
import GetMenuItemUseCase from "./domain/usecase/menu/GetMenuItemUseCase";
import GetMenuItemsUseCase from "./domain/usecase/menu/GetMenuItemsUseCase";
import UpdateMenuItemUseCase from "./domain/usecase/menu/UpdateMenuItemUseCase";
import AddMenuAddOnUseCase from "./domain/usecase/menu/AddMenuAddOnUseCase";
import UpdateMenuAddOnUseCase from "./domain/usecase/menu/UpdateMenuAddOnUseCase";

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
});

// Domain Layer
container.register({
  addDeviceUseCase: asClass(AddDeviceUseCase).singleton(),

  verifyPasswordUseCase: asClass(VerifyPasswordUseCase).singleton(),
  setAuthUseCase: asClass(SetAuthUseCase).singleton(),
  verifyPinUseCase: asClass(VerifyPinUseCase).singleton(),
  logoutUseCase: asClass(LogoutUseCase).singleton(),
  keepAliveUseCase: asClass(KeepAliveUseCase).singleton(),
  getInfoUseCase: asClass(ActionInfoUseCase).singleton(),
  registerUseCase: asClass(RegisterUseCase).singleton(),

  getChannelUseCase: asClass(GetChannelUseCase).singleton(),
  verifyUserUseCase: asClass(VerifyUserUseCase).singleton(),
  getCodeUseCase: asClass(GetCodeUseCase).singleton(),
  verifyCodeUseCase: asClass(VerifyCodeUseCase).singleton(),

  getUsersUseCase: asClass(GetUsersUseCase).singleton(),
  getUserUseCase: asClass(GetUserUseCase).singleton(),
  addUserUseCase: asClass(AddUserUseCase).singleton(),
  updateUserUseCase: asClass(UpdateUserUseCase).singleton(),
  removeUserUseCase: asClass(RemoveUserUseCase).singleton(),

  subscriptionUseCase: asClass(SubscriptionUseCase).singleton(),
  addNotificationUseCase: asClass(AddNotificationUseCase).singleton(),
  getNotificationsUseCase: asClass(GetNotificationsUseCase).singleton(),
  getUnreadUseCase: asClass(GetUnreadUseCase).singleton(),
  markReadUseCase: asClass(MarkReadUseCase).singleton(),

  getTermConditionUseCase: asClass(GetTermConditionUseCase).singleton(),
  addTermConditionUseCase: asClass(AddTermConditionUseCase).singleton(),
  updateTermConditionUseCase: asClass(UpdateTermConditionUseCase).singleton(),

  addRestaurantUseCase: asClass(AddRestaurantUseCase).singleton(),
  logInRestaurantUseCase: asClass(LogInRestaurantUseCase).singleton(),
  getRestaurantsUseCase: asClass(GetRestaurantsUseCase).singleton(),
  getRestaurantUseCase: asClass(GetRestaurantUseCase).singleton(),
  updateRestaurantUseCase: asClass(UpdateRestaurantUseCase).singleton(),

  addMenuItemUseCase: asClass(AddMenuItemUseCase).singleton(),
  getMenuItemUseCase: asClass(GetMenuItemUseCase).singleton(),
  getMenuItemsUseCase: asClass(GetMenuItemsUseCase).singleton(),
  updateMenuItemUseCase: asClass(UpdateMenuItemUseCase).singleton(),
  addMenuAddOnUseCase: asClass(AddMenuAddOnUseCase).singleton(),
  updateMenuAddOnUseCase: asClass(UpdateMenuAddOnUseCase).singleton(),

});

// Middle Wares
container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
  swaggerMiddleware: asValue([swaggerMiddleware]),
});

export default container
