import { before, GET, POST, PUT, route } from 'awilix-express'
import { authRestaurant } from '../ApiController';

@route('/restaurant-menu')
export default class RestaurantMenuController {
  constructor(
    {
      getMenuItemUseCase,
      getMenuItemsUseCase,
      updateMenuItemUseCase,
      addMenuItemUseCase,
      addMenuAddOnUseCase,
      updateMenuAddOnUseCase,
    }
  ) {
    this.getMenuItemsUseCase = getMenuItemsUseCase;
    this.getMenuItemUseCase = getMenuItemUseCase;
    this.updateMenuItemUseCase = updateMenuItemUseCase;
    this.addMenuItemUseCase = addMenuItemUseCase;
    this.addMenuAddOnUseCase = addMenuAddOnUseCase;
    this.updateMenuAddOnUseCase = updateMenuAddOnUseCase;
  }

  @GET()
  @before([authRestaurant])
  async getMenuItems(req, res, next) {
    try {
      const result = await this.getMenuItemsUseCase.execute({
        restaurantId: req.decoded._id
      });
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @GET()
  @route('/:id')
  @before([authRestaurant])
  async getMenuItem(req, res, next) {
    try {
      const result = await this.getMenuItemUseCase.execute({
        menuItemId: req.params.id
      });
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @PUT()
  @route('/:id')
  @before([authRestaurant])
  async updateMenuItem(req, res, next) {
    try {
      let param = {}
      param.id = req.params.id
      param.data = req.body
      param.data.updatedBy = req.decoded._id
      param.data.updatedDate = new Date()
      const result = await this.updateMenuItemUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @POST()
  @before([authRestaurant])
  async addMenuItem(req, res, next) {
    try {
      const param = req.body
      param.restaurantId = req.decoded._id
      param.createdBy = req.decoded._id
      param.updatedBy = req.decoded._id
      param.updatedDate = new Date()
      const result = await this.addMenuItemUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @POST()
  @route('/:id/add-on')
  @before([authRestaurant])
  async addMenuAddOn(req, res, next) {
    try {
      const param = req.body
      param.restaurantId = req.decoded._id
      param.menuItemId = req.params.id
      param.createdBy = req.decoded._id
      param.updatedBy = req.decoded._id
      param.updatedDate = new Date()
      const result = await this.addMenuAddOnUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @PUT()
  @route('/add-on/:id')
  @before([authRestaurant])
  async updateMenuAddOn(req, res, next) {
    try {
      let param = {}
      param.id = req.params.id
      param.data = req.body
      param.data.updatedBy = req.decoded._id
      param.data.updatedDate = new Date()
      const result = await this.updateMenuAddOnUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

}
