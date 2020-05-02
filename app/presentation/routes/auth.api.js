import { before, GET, POST, route } from 'awilix-express'
import AuthMapper from '../mapper/auth.mapper';
import { authenticate, verifyAction } from '../api.handler';

@route('/auth')
export default class AuthApi {
  constructor({ loginUseCase, getChannelUseCase, verifyUserUseCase, verifyCodeUseCase, setPasswordUseCase, verifyPasswordUseCase }) {
    this.loginUseCase = loginUseCase;
    this.getChannelUseCase = getChannelUseCase;
    this.verifyUserUseCase = verifyUserUseCase;
    this.verifyCodeUseCase = verifyCodeUseCase;
    this.setPasswordUseCase = setPasswordUseCase;
    this.verifyPasswordUseCase = verifyPasswordUseCase;
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

  @route('/channel/:username')
  @GET()
  async getChannelUsername(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.getChannel(req.params)
      const result = await this.getChannelUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/channel')
  @GET()
  @before([authenticate])
  async getChannel(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.getChannel(req.decoded)
      const result = await this.getChannelUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/verify-user')
  @POST()
  async verifyUser(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.verifyUser(req.body)
      const result = await this.verifyUserUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/verify-code')
  @POST()
  async verifyCode(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.verifyCode(req.body)
      const result = await this.verifyCodeUseCase.execute(param);
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
}
