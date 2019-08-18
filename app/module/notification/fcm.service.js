/* eslint-disable max-len */

import request from 'request';
import config from 'config';

import logger from '../../logger/logger' // Load logger

const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY || config.get('fcmServerKey');

export const callFcm = (messageData, retries = 5) => {

  if (retries < 0) {
    logger.error('No more retries left.', { messageData });
    return;
  }

  const headers = {
    'Authorization': "key=" + FCM_SERVER_KEY,
  };

  request(`https://fcm.googleapis.com/fcm/send`, {
    headers: headers,
    method: 'POST',
    json: messageData
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Message has been successfully received by Facebook.
      logger.info(`Successfully sent message to FCM : ` + JSON.stringify(messageData));
    } else {
      // Message has not been successfully received by Facebook.
      logger.error(
        `Failed calling FCM API`,
        response.statusCode,
        response.statusMessage,
        body.error
      );
    }
  });
};

