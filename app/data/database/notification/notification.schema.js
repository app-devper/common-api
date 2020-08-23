/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'

/**
 * Notification Schema
 */

const NotificationSchema = new Schema({
  receiver: {type: Schema.Types.ObjectId, ref: 'users'},
  title: {type: String, trim: true},
  body: {type: String, trim: true},
  status: {type: String, trim: true, default: "UNREAD"},
  action: {type: String, trim: true, default: ""},
  createdDate: {type: Date, default: Date.now}
}, {collection: 'notifications', versionKey: false});

export default mongoose.model('notifications', NotificationSchema)
