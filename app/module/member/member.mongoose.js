import logger from '../../logger/logger' // Load logger
import MemberSchema from './member.schema'

export const addMember = (member) => {
  logger.info('mongoose addMember');
  const memberData = new MemberSchema(member);
  return memberData.save()
};

export const updateMember = (memberId, member) => {
  logger.info('mongoose updateMember');
  return MemberSchema.findByIdAndUpdate({ _id: memberId }, { $set: member }, { new: true }).lean()
};

export const getMemberById = (_id) => {
  logger.info('mongoose getMemberById');
  return MemberSchema.findOne({ _id: _id }).lean()
};

export const getMemberByFbId = (senderId) => {
  logger.info('mongoose getMemberById');
  return MemberSchema.findOne({ senderId: senderId }).lean()
};

export const removeMember = (memberId) => {
  logger.info('mongoose removeMember');
  return MemberSchema.findByIdAndRemove({ _id: memberId })
};

export const removeMemberList = (memberIds) => {
  logger.info('mongoose removeMemberList');
  return MemberSchema.deleteMany({ _id: { $in: memberIds } })
};

export const getMember = () => {
  logger.info('mongoose getMember');
  return MemberSchema.find({}).lean()
};

export const countMember = () => {
  logger.info('mongoose countMember');
  return MemberSchema.countDocuments({})
};

export const getMemberLimit = (offset = 0, limit = 20) => {
  logger.info('mongoose getMemberLimit');
  return MemberSchema.find({}).limit(limit)
    .skip(offset).lean()
};
