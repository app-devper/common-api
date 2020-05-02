/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'

/**
 * UserRef Schema
 */
const UserRefSchema = new Schema({
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
  createdDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
}, { collection: 'user_refs', versionKey: false });

// Build the user_refs Model:
export default mongoose.model('user_refs', UserRefSchema)
