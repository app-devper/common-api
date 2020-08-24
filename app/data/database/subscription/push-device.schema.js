import mongoose, { Schema } from 'mongoose'

const PushDeviceSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'users', required: true},
  channel: {type: String, trim: true, required: true},
  deviceToken: {type: String, trim: true, required: true},
  createdDate: {type: Date, default: Date.now}
}, {collection: 'push_devices', versionKey: false});

export default mongoose.model('push_devices', PushDeviceSchema)
