/**
 * Module dependencies.
 */
import mongoose, {Schema} from 'mongoose'

/**
 * User Schema
 */
let UsersSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
  createdDate: {type: Date, default: Date.now},
  updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
  updatedDate: {type: Date},
  status: String,
  phone: String,
  role: String,
  email: String,
  countLoginFailed: Number,
  timeToUnlock: {type: Date},
});

// Build the users Model:
module.exports = mongoose.model('users', UsersSchema);
