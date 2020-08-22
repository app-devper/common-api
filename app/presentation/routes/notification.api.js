import { before, POST, route } from 'awilix-express'
import NotificationMapper from "../mapper/notification.mapper";
import { authenticate } from "../api.handler";

@route('/notification')
export default class NotificationApi {
  constructor({addPushDeviceUseCase}) {
    this.addPushDeviceUseCase = addPushDeviceUseCase
  }

  @route('/subscription')
  @POST()
  @before([authenticate])
  async subscription(req, res, next) {
    try {
      const body = req.body;
      const mapper = new NotificationMapper()
      const param = mapper.getDevice(body, req.decoded._id)
      await this.addPushDeviceUseCase.execute(param);
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }
}
