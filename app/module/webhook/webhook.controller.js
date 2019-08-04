import * as service from './webhook.service'
import logger from '../../logger/logger'
import config from 'config';

export const handleReceive = (req, res) => {
  res.sendStatus(200);
  service.handleReceive(req)
};

export const verifyToken = (req, res) => {
  const VALIDATION_TOKEN = (process.env.VALIDATION_TOKEN) ? (process.env.VALIDATION_TOKEN) : config.get('validationToken');

  // Parse the query params
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VALIDATION_TOKEN) {
      // Responds with the challenge token from the request
      logger.info('Webhook verified');
      res.status(200).send(challenge);
    } else {
      logger.error('Verify tokens do not match');
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    logger.error('Verify tokens wrong query params');
    res.status(500).send('Error, wrong query params');
  }
};
