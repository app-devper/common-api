import { POST, route } from 'awilix-express'

@route('/auth')
export default class AuthApi {
  constructor ({ loginUseCase }) {
    this.loginUseCase = loginUseCase;
  }

  @POST()
  async login (req, res, next) {
    try {
      const body = req.body;
      const result = await this.loginUseCase.execute({ username: body.username, password: body.pwd });
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
