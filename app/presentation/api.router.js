import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import { loadControllers } from 'awilix-express'

export const router = ({ containerMiddleware, swaggerMiddleware, errorHandler }) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);

  apiRouter.use(loadControllers('routes/*.js', { cwd: __dirname }));

  router.use('/api', apiRouter);
  router.use(errorHandler);

  return router;
};
