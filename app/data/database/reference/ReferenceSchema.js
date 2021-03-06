import mongoose, { Schema } from 'mongoose'

const ReferenceSchema = new Schema({
  refCode: {
    type: String, trim: true, uppercase: true
  },
  code: {
    type: String, trim: true, uppercase: true
  },
  channel: {
    type: String, uppercase: true, trim: true
  },
  expiredDate: { type: Date },
  active: { type: Boolean, default: false },
  countFailed: { type: Number, default: 0 },
  countRequest: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
}, { collection: 'references', versionKey: false });

export default mongoose.model('references', ReferenceSchema)
