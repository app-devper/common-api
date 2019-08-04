
import { getProfile, sendBotMessage, sendReadReceipt } from './send';
import * as memberMongoose from '../../member/member.mongoose'
import * as messageMongoose from '../../message/message.mongoose'

export const handleReceiveMessage = async (event) => {
  const message = event.message;
  const senderId = event.sender.id;

  let member = await memberMongoose.getMemberByFbId(senderId);
  if (!member) {
    member = await memberMongoose.addMember({ senderId: senderId });
    getProfile(member._id, senderId);
  }

  if (message.text) {
    const result = await messageMongoose.getMessageByKey(message.text);
    if (result) {
      sendReadReceipt(senderId);
      sendBotMessage(senderId, result.message);
    }
  }
};
