import { before, DELETE, GET, POST, PUT, route } from 'awilix-express'
import { authenticate, permission } from '../api.handler';
import UserMapper from "../mapper/user.mapper";

@route('/user')
export default class UserApi {
  constructor({ getUsersUseCase, getUserUseCase, updateUserUseCase, addUserUseCase, removeUserUseCase }) {
    this.getUsersUseCase = getUsersUseCase;
    this.getUserUseCase = getUserUseCase;
    this.updateUserUseCase = updateUserUseCase
    this.addUserUseCase = addUserUseCase
    this.removeUserUseCase = removeUserUseCase
  }

  @route('/info')
  @GET()
  @before([authenticate])
  async getProfile(req, res, next) {
    try {
      const mapper = new UserMapper()
      const param = mapper.getUserId(req.decoded._id)
      const result = await this.getUserUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @GET()
  @before([authenticate, permission])
  async getUsers(req, res, next) {
    try {
      const mapper = new UserMapper()
      const param = mapper.getPaging(req.query)
      const result = await this.getUsersUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/:id')
  @GET()
  @before([authenticate, permission])
  async getUser(req, res, next) {
    try {
      const mapper = new UserMapper()
      const param = mapper.getUserId(req.params.id)
      const result = await this.getUserUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/info')
  @PUT()
  @before([authenticate])
  async updateProfile(req, res, next) {
    try {
      const mapper = new UserMapper()
      const id = mapper.getUserId(req.decoded._id)
      const body = mapper.getUserBody(req.body, req.decoded._id)
      const param = { id: id.id, user: body.user }
      const result = await this.updateUserUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/:id')
  @PUT()
  @before([authenticate, permission])
  async updateUser(req, res, next) {
    try {
      const mapper = new UserMapper()
      const id = mapper.getUserId(req.params.id)
      const body = mapper.getUserBody(req.body, req.decoded._id)
      const param = { id: id.id, user: body.user }
      const result = await this.updateUserUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @POST()
  @before([authenticate, permission])
  async addUser(req, res, next) {
    try {
      const mapper = new UserMapper()
      const param = mapper.addUserBody(req.body, req.decoded._id)
      const result = await this.addUserUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/:id')
  @DELETE()
  @before([authenticate, permission])
  async removeUser(req, res, next) {
    try {
      const mapper = new UserMapper()
      const param = mapper.removeUserId(req.params.id, req.decoded._id)
      const result = await this.removeUserUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
