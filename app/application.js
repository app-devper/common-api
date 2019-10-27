export default class Application {
  constructor ({ server, logger }) {
    this.logger = logger;
    this.server = server;
  }

  async start () {
    await this.server.start();
  }
}
