import castArray from 'lodash/castArray';
import { callMessagesAPI, callProfileAPI } from './api';

// Turns typing indicator on.
const typingOn = (recipientId) => {
  return {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_on' // eslint-disable-line camelcase
  };
};

// Turns typing indicator off.
const typingOff = (recipientId) => {
  return {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_off' // eslint-disable-line camelcase
  };
};

// Wraps a message json object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId
    },
    message: messagePayload
  };
};

// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

  callMessagesAPI(
    [
      typingOn(recipientId),
      ...messagePayloadArray,
      typingOff(recipientId)
    ]);
};

// Send a welcome message.
export const sendBotMessage = (recipientId, massage) => {
  sendMessage(
    recipientId, [
      {
        text: massage
      }
    ]
  );
};

// Send a read receipt to indicate the message has been read
export const sendReadReceipt = (recipientId) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'mark_seen' // eslint-disable-line camelcase
  };

  callMessagesAPI(messageData);
};

export const getProfile = (id, senderId) => {
  const query = {
    fields: 'first_name,last_name,profile_pic'
  };
  callProfileAPI(id, senderId, query);
};
