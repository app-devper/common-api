import logger from '../../logger/logger'

import { handleReceiveMessage } from './messager-helper/receive';

export const handleReceive = (req) => {
  const data = req.body;
  // Make sure this is a page subscription
  logger.info('req body: ' + JSON.stringify(data));

  if (data.object === 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach((pageEntry) => {
      if (!pageEntry.messaging) {
        return;
      }
      // Iterate over each messaging event
      pageEntry.messaging.forEach((messagingEvent) => {
        logger.info('messagingEvent: ' + JSON.stringify(messagingEvent));
        if (messagingEvent.message) {
          // noinspection JSIgnoredPromiseFromCall
          handleReceiveMessage(messagingEvent);
        } else {
          logger.info('Webhook received unknown messagingEvent: ' + JSON.stringify(messagingEvent));
        }
      });
    });
  }
};
