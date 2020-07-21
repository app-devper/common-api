/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'

/**
 * Reference Schema
 */
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
  createdDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
}, { collection: 'references', versionKey: false });

// Build the references Model:
export default mongoose.model('references', ReferenceSchema)
