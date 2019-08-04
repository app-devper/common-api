import logger from '../../logger/logger'
import { genResponse, pagination } from '../../util/utils'
import * as memberMongoose from './member.mongoose'
import mongoose from 'mongoose';
import { resMessage } from '../../common/message.properties';

export const getMember = async (req) => {
  try {
    const count = await memberMongoose.countMember();
    const { offset, limit, nextUrl, previousUrl, fullUrl } = pagination(req, count);
    let result = await memberMongoose.getMemberLimit(offset, limit);
    result = result.map(item => {
      item.url = fullUrl + req.path + item._id;
      return item
    });
    return genResponse(req.language, resMessage.general.success, 'Get Member success',
      { count, next: nextUrl, previous: previousUrl, results: result })
  } catch (err) {
    logger.error('service getMember Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};

export const getMemberById = async (req) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.memberId)) {
      return genResponse(req.language, resMessage.general.invalidData, 'Invalid Member id format')
    } else {
      const result = await memberMongoose.getMemberById(req.params.memberId);
      if (result) {
        return genResponse(req.language, resMessage.general.success, 'Get Member success', result)
      } else {
        logger.info('Member not found');
        return genResponse(req.language, resMessage.general.dataNotFound, 'Member not found')
      }
    }
  } catch (err) {
    logger.error('service getMemberById Exception: ' + err);
    return genResponse(req.language, resMessage.general.error, err.message)
  }
};
