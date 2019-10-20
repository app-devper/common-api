import logger from '../../logger/logger' // Load logger
import DeviceSchema from './device.schema'

export const addDevice = (device) => {
  logger.info('mongoose addDevice');
  const deviceData = new DeviceSchema(device);
  return deviceData.save()
};

export const updateDevice = (id, device) => {
  logger.info('mongoose updateDevice');
  return DeviceSchema.findByIdAndUpdate({ _id: id }, { $set: device }, { new: true }).lean()
};

export const getDeviceById = (deviceId) => {
  logger.info('mongoose getDeviceById');
  return DeviceSchema.findOne({ deviceId: deviceId }).lean()
};
