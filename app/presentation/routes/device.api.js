import { POST, route } from 'awilix-express'

@route('/device')
export default class DeviceApi {
  constructor ({ addDeviceUseCase }) {
    this.addDeviceUseCase = addDeviceUseCase;
  }

  @POST()
  async addDevice (req, res, next) {
    try {
      const body = req.body;
      const result = await this.addDeviceUseCase.execute(body);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }
}
