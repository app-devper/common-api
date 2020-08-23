import mongoose, { Schema } from 'mongoose'

const PushDeviceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  channel: { type: String, trim: true },
  deviceToken: { type: String, trim: true },
  createdDate: { type: Date, default: Date.now }
}, { collection: 'push_devices', versionKey: false });

export default mongoose.model('push_devices', PushDeviceSchema)
