import express from 'express'

export default class Server {
  constructor ({ config, database, router, logger }) {
    this.config = config;
    this.logger = logger;
    const db = database.connect();
    this.express = express(db);
    this.express.disable('x-powered-by');
    this.express.use(router);
  }

  start () {
    const port = process.env.PORT || this.config.app.port;
    return new Promise((resolve) => {
      const http = this.express.listen(port, () => {
        const { port } = http.address();
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
        resolve();
      });
    });
  }
}
