import { before, GET, POST, route } from 'awilix-express'
import { authenticate, verifyAction } from '../ApiController';
import AuthMapper from '../feature/auth/mapper/AuthMapper';

@route('/auth')
export default class AuthController {
  constructor(
    {
      verifyPasswordUseCase,
      verifyPinUseCase,
      setAuthUseCase,
      logoutUseCase,
      keepAliveUseCase,
      getInfoUseCase,
      registerUseCase
    }
  ) {
    this.verifyPasswordUseCase = verifyPasswordUseCase;
    this.setAuthUseCase = setAuthUseCase;
    this.verifyPinUseCase = verifyPinUseCase;
    this.logoutUseCase = logoutUseCase;
    this.keepAliveUseCase = keepAliveUseCase;
    this.getInfoUseCase = getInfoUseCase;
    this.registerUseCase = registerUseCase;
  }

  @POST()
  async login(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.getBody(req.body)
      const result = await this.verifyPasswordUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/register')
  @POST()
  async register(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.registerBody(req.body)
      await this.registerUseCase.execute(param);
      res.status(201).send()
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
      await this.setAuthUseCase.execute(param);
      res.status(201).send()
    } catch (err) {
      next(err)
    }
  }

  @route('/action-info')
  @GET()
  @before([verifyAction])
  async actionInfo(req, res, next) {
    try {
      const result = await this.getInfoUseCase.execute({userRefId: req.userRefId});
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

  @route('/keep-alive')
  @GET()
  @before([authenticate])
  async keepAlive(req, res, next) {
    try {
      const result = await this.keepAliveUseCase.execute({username: req.decoded.username});
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/pin')
  @POST()
  async loginPin(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.getPinBody(req.body)
      const result = await this.verifyPinUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/set-pin')
  @POST()
  @before([verifyAction])
  async setPin(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.setPin(req.body, req.userRefId)
      await this.setAuthUseCase.execute(param);
      res.status(201).send()
    } catch (err) {
      next(err)
    }
  }

  @route('/verify-pin')
  @POST()
  @before([authenticate])
  async verifyPin(req, res, next) {
    try {
      const mapper = new AuthMapper()
      const param = mapper.verifyPin(req.body, req.decoded.username)
      const result = await this.verifyPinUseCase.execute(param);
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
      const mapper = new AuthMapper()
      const param = mapper.getUserId(req.decoded._id)
      const result = await this.logoutUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
