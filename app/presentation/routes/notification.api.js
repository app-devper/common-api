import { before, GET, POST, PUT, route } from 'awilix-express'
import NotificationMapper from "../mapper/notification.mapper";
import { authenticate } from "../api.handler";

@route('/notification')
export default class NotificationApi {
  constructor({subscriptionUseCase, addNotificationUseCase, getNotificationsUseCase, getUnreadUseCase, markReadUseCase}) {
    this.subscriptionUseCase = subscriptionUseCase
    this.addNotificationUseCase = addNotificationUseCase
    this.getNotificationsUseCase = getNotificationsUseCase
    this.getUnreadUseCase = getUnreadUseCase
    this.markReadUseCase = markReadUseCase
  }

  @route('/subscription')
  @POST()
  @before([authenticate])
  async subscription(req, res, next) {
    try {
      const body = req.body;
      const mapper = new NotificationMapper()
      const param = mapper.getDevice(body, req.decoded._id)
      await this.subscriptionUseCase.execute(param);
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }

  @route('/push')
  @POST()
  async push(req, res, next) {
    try {
      const body = req.body;
      const mapper = new NotificationMapper()
      const param = mapper.getNotification(body)
      let result = await this.addNotificationUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @GET()
  @before([authenticate])
  async getNotifications(req, res, next) {
    try {
      const mapper = new NotificationMapper()
      const param = mapper.getPaging(req.query, req.decoded._id)
      const result = await this.getNotificationsUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/unread')
  @GET()
  @before([authenticate])
  async getUnread(req, res, next) {
    try {
      const param = {userId: req.decoded._id}
      const result = await this.getUnreadUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

  @route('/read')
  @PUT()
  @before([authenticate])
  async markRead(req, res, next) {
    try {
      const body = req.body;
      const param = {userId: req.decoded._id, id: body.id}
      const result = await this.markReadUseCase.execute(param);
      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  }

}
