import { before, GET, POST, PUT, route } from 'awilix-express'
import { authenticate } from '../ApiController';

@route('/user-menu')
export default class UserMenuController {
  constructor(
    {
      getMenuItemUseCase,
      getMenuItemsUseCase,
    }
  ) {
    this.getMenuItemsUseCase = getMenuItemsUseCase;
    this.getMenuItemUseCase = getMenuItemUseCase;
  }

  @GET()
  async getMenuItems(req, res, next) {
    try {
      let param = {}
      if (req.query["restaurantId"]) {
        param.restaurantId = req.query["restaurantId"]
      }
      const result = await this.getMenuItemsUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @GET()
  @route('/:id')
  async getMenuItem(req, res, next) {
    try {
      let param = {}
      param.menuItemId = req.params.id
      if (req.query["restaurantId"]) {
        param.restaurantId = req.query["restaurantId"]
      }
      const result = await this.getMenuItemUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

}
