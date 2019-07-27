/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'

/**
 * Member Schema
 */

let MemberSchema = new Schema({
  senderId: { type: String, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  profilePic: { type: String, trim: true },
  createdDate: { type: Date, default: Date.now }
}, { collection: 'members', versionKey: false });

// Build the Member Model:
export default mongoose.model('members', MemberSchema)
