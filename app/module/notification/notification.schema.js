/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'

/**
 * Notification Schema
 */

const NotificationSchema = new Schema({
  title: { type: String, trim: true },
  body: { type: String, trim: true },
  priority: { type: String, trim: true, default: "high" },
  status: { type: String, trim: true },
  destination: { type: String, trim: true },
  expireDate: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  createdDate: { type: Date, default: Date.now },
}, { collection: 'notifications', versionKey: false });

export default mongoose.model('notifications', NotificationSchema)
