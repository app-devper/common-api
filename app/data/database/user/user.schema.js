/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'

/**
 * User Schema
 */
const UserSchema = new Schema({
  username: {
    type: String, index: true, unique: true, lowercase: true, trim: true, required: true
  },
  password: {
    type: String, trim: true, required: true, lowercase: true
  },
  pin: {
    type: String, trim: true, lowercase: true
  },
  firstName: String,
  lastName: String,
  status: {
    type: String, trim: true, required: true, uppercase: true
  },
  phone: String,
  role: {
    type: String, trim: true, required: true, uppercase: true
  },
  email: {
    type: String, lowercase: true, trim: true
  },
  gender: {
    type: String, uppercase: true, trim: true
  }, // MALE, FEMALE
  countLoginFailed: { type: Number, default: 0 },
  countPinFailed: { type: Number, default: 0 },
  timeToUnlock: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  createdDate: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
  updatedDate: { type: Date }
}, { collection: 'users', versionKey: false });

// Build the users Model:
export default mongoose.model('users', UserSchema)
