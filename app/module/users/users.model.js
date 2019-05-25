/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'

/**
 * User Schema
 */
let UsersSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  status: String,
  phone: String,
  role: String,
  email: String,
  gender: String, // MALE, FEMALE
  countLoginFailed: { type: Number, default: 0 },
  timeToUnlock: { type: Date, default: null },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  createdDate: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
  updatedDate: { type: Date }
}, { collection: 'users', versionKey: false });

// Build the users Model:
export default mongoose.model('users', UsersSchema)
