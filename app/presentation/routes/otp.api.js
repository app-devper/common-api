import { before, GET, POST, route } from 'awilix-express'
import { authenticate } from '../api.handler';
import OtpMapper from "../mapper/otp.mapper";

@route('/otp')
export default class OtpApi {
  constructor({ getChannelUseCase, verifyUserUseCase, verifyCodeUseCase, getCodeUseCase }) {
    this.getChannelUseCase = getChannelUseCase;
    this.verifyUserUseCase = verifyUserUseCase;
    this.verifyCodeUseCase = verifyCodeUseCase;
    this.getCodeUseCase = getCodeUseCase;
  }

  @route('/channel/:username')
  @GET()
  async getChannelUsername(req, res, next) {
    try {
      const mapper = new OtpMapper()
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
      const mapper = new OtpMapper()
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
      const mapper = new OtpMapper()
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
      const mapper = new OtpMapper()
      const param = mapper.verifyCode(req.body)
      const result = await this.verifyCodeUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/code/:refCode')
  @GET()
  async getCode(req, res, next) {
    try {
      const mapper = new OtpMapper()
      const param = mapper.getCode(req.params)
      const result = await this.getCodeUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

}
