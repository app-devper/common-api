import { asClass, asFunction, asValue, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express'
import config from 'config';
import { logger } from './core/logger/Logger'
import Application from './Application';
import Server from './presentation/Server';
import { router } from './presentation/ApiController'

import Database from './data/database/Database';

import GetUsersUseCase from './presentation/feature/user/GetUsersUseCase';
import GetUserUseCase from './presentation/feature/user/GetUserUseCase';
import RemoveUserUseCase from "./presentation/feature/user/RemoveUserUseCase";
import UpdateUserUseCase from "./presentation/feature/user/UpdateUserUseCase";
import AddUserUseCase from "./presentation/feature/user/AddUserUseCase";

import AddDeviceUseCase from './presentation/feature/device/AddDeviceUseCase';

import GetChannelUseCase from "./presentation/feature/auth/GetChannelUseCase";
import VerifyUserUseCase from "./presentation/feature/auth/VerifyUserUseCase";
import VerifyCodeUseCase from "./presentation/feature/auth/VerifyCodeUseCase";
import GetCodeUseCase from "./presentation/feature/auth/GetCodeUseCase";

import SetAuthUseCase from "./presentation/feature/auth/SetAuthUseCase";
import VerifyPasswordUseCase from "./presentation/feature/auth/VerifyPasswordUseCase";
import VerifyPinUseCase from "./presentation/feature/auth/VerifyPinUseCase";
import KeepAliveUseCase from "./presentation/feature/auth/KeepAliveUseCase";
import LogoutUseCase from "./presentation/feature/auth/LogoutUseCase";
import ActionInfoUseCase from "./presentation/feature/auth/ActionInfoUseCase";
import RegisterUseCase from "./presentation/feature/auth/RegisterUseCase";
import SubscriptionUseCase from "./presentation/feature/notification/SubscriptionUseCase";
import AddNotificationUseCase from "./presentation/feature/notification/AddNotificationUseCase";
import GetNotificationsUseCase from "./presentation/feature/notification/GetNotificationsUseCase";
import GetUnreadUseCase from "./presentation/feature/notification/GetUnreadUseCase";
import MarkReadUseCase from "./presentation/feature/notification/MarkReadUseCase";

import GetTermConditionUseCase from "./presentation/feature/termcondition/GetTermConditionUseCase";
import AddTermConditionUseCase from "./presentation/feature/termcondition/AddTermConditionUseCase";
import UpdateTermConditionUseCase from "./presentation/feature/termcondition/UpdateTermConditionUseCase";

import LogInRestaurantUseCase from "./presentation/feature/restaurant/LogInRestaurantUseCase";
import GetRestaurantsUseCase from "./presentation/feature/restaurant/GetRestaurantsUseCase";
import GetRestaurantUseCase from "./presentation/feature/restaurant/GetRestaurantUseCase";
import AddRestaurantUseCase from "./presentation/feature/restaurant/AddRestaurantUseCase";
import UpdateRestaurantUseCase from "./presentation/feature/restaurant/UpdateRestaurantUseCase";

import AddMenuItemUseCase from "./presentation/feature/menu/AddMenuItemUseCase";
import GetMenuItemUseCase from "./presentation/feature/menu/GetMenuItemUseCase";
import GetMenuItemsUseCase from "./presentation/feature/menu/GetMenuItemsUseCase";
import UpdateMenuItemUseCase from "./presentation/feature/menu/UpdateMenuItemUseCase";
import AddMenuAddOnUseCase from "./presentation/feature/menu/AddMenuAddOnUseCase";
import UpdateMenuAddOnUseCase from "./presentation/feature/menu/UpdateMenuAddOnUseCase";

import GetNotificationUseCase from "./presentation/feature/notification/GetNotificationUseCase";

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
  getNotificationUseCase: asClass(GetNotificationUseCase).singleton(),
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

// Middlewares
container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
  swaggerMiddleware: asValue([swaggerMiddleware]),
});

export default container
