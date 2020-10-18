import mongoose, { Schema } from 'mongoose'

const DeviceSchema = new Schema({
  deviceId: { type: String, trim: true, index: true },
  uuid: { type: String, trim: true },
  apiLevel: { type: String, trim: true },
  board: { type: String, trim: true },
  bootLoader: { type: String, trim: true },
  brand: { type: String, trim: true },
  buildId: { type: String, trim: true },
  buildTime: { type: String, trim: true },
  fingerprint: { type: String, trim: true },
  hardware: { type: String, trim: true },
  host: { type: String, trim: true },
  model: { type: String, trim: true },
  user: { type: String, trim: true },
  screenDensity: { type: String, trim: true },
  screenResolution: { type: String, trim: true },
  createdDate: { type: Date, default: Date.now }
}, { collection: 'devices', versionKey: false });

// Build the Device Model:
export default mongoose.model('devices', DeviceSchema)
