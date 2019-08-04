/* eslint-disable max-len */

import castArray from 'lodash/castArray';
import isEmpty from 'lodash/isEmpty';
import request from 'request';
import config from 'config';

import logger from '../../../logger/logger' // Load logger

const PAGE_ACCESS_TOKEN = (process.env.PAGE_ACCESS_TOKEN) ? (process.env.PAGE_ACCESS_TOKEN) : config.get('pageAccessToken');

const callAPI = (endPoint, messageDataArray, queryParams = {}, retries = 5) => {
  // Error if developer forgot to specify an endpoint to send our request to
  if (!endPoint) {
    logger.error('callAPI requires you specify an endpoint.');
    return;
  }

  // Error if we've run out of retries.
  if (retries < 0) {
    logger.error('No more retries left.', { endPoint, messageDataArray, queryParams });
    return;
  }

  // ensure query parameters have a PAGE_ACCESS_TOKEN value
  const query = Object.assign({ access_token: PAGE_ACCESS_TOKEN }, queryParams);

  // ready the first message in the array for send.
  const [messageToSend, ...queue] = castArray(messageDataArray);
  request(`https://graph.facebook.com/v2.6/me/${endPoint}`, {
    qs: query,
    method: 'POST',
    json: messageToSend
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Message has been successfully received by Facebook.
      logger.info(`Successfully sent message to ${endPoint} endpoint: ` + JSON.stringify(messageToSend));

      // Continue sending payloads until queue empty.
      if (!isEmpty(queue)) {
        callAPI(endPoint, queue, queryParams);
      }
    } else {
      // Message has not been successfully received by Facebook.
      logger.error(
        `Failed calling Messenger API endpoint ${endPoint}`,
        response.statusCode,
        response.statusMessage,
        body.error,
        queryParams
      );
      // Retry the request
      logger.error(`Retrying Request: ${retries} left`);
      callAPI(endPoint, messageDataArray, queryParams, retries - 1);
    }
  });
};

export const callProfileAPI = (id, endPoint, queryParams = {}) => {
  // Error if developer forgot to specify an endpoint to send our request to
  if (!endPoint) {
    logger.error('callAPI requires you specify an endpoint.');
    return null;
  }

  // ensure query parameters have a PAGE_ACCESS_TOKEN value
  const query = Object.assign({ access_token: PAGE_ACCESS_TOKEN }, queryParams);

  // ready the first message in the array for send.
  request(`https://graph.facebook.com/${endPoint}`, {
    qs: query,
    method: 'GET',
    json: {}
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Message has been successfully received by Facebook.
      logger.info(`Successfully response: ` + JSON.stringify(body));
    } else {
      // Message has not been successfully received by Facebook.
      logger.error(`Failed calling get profile ${endPoint}`);
    }
  });
};

export const callMessagesAPI = (messageDataArray, queryParams = {}) => {
  return callAPI('messages', messageDataArray, queryParams);
};
