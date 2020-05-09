import { before, GET, POST, route } from 'awilix-express'
import AuthMapper from '../mapper/auth.mapper';
import { authenticate, verifyAction } from '../api.handler';
import UserMapper from "../mapper/user.mapper";

@route('/auth')
export default class AuthApi {
  constructor({ loginUseCase, setPasswordUseCase, verifyPasswordUseCase, logoutUseCase }) {
    this.loginUseCase = loginUseCase;
    this.setPasswordUseCase = setPasswordUseCase;
    this.verifyPasswordUseCase = verifyPasswordUseCase;
    this.logoutUseCase = logoutUseCase;
  }

  @POST()
  async login(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.getBody(req.body)
      const result = await this.loginUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/set-password')
  @POST()
  @before([verifyAction])
  async setPassword(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.setPassword(req.body, req.userRefId)
      const result = await this.setPasswordUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/verify-password')
  @POST()
  @before([authenticate])
  async verifyPassword(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.verifyPassword(req.body, req.decoded.username)
      const result = await this.verifyPasswordUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/logout')
  @GET()
  @before([authenticate])
  async logout(req, res, next) {
    try {
      const mapper = new UserMapper()
      const param = mapper.getUserId(req.decoded._id)
      const result = await this.logoutUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
