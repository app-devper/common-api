import mongoose, { Schema } from 'mongoose'

const NotificationSchema = new Schema({
  receiver: {type: Schema.Types.ObjectId, ref: 'users', required: true,},
  title: {type: String, trim: true, required: true,},
  body: {type: String, trim: true, required: true,},
  status: {type: String, trim: true, default: "UNREAD", uppercase: true},
  action: {type: String, trim: true, default: "", uppercase: true},
  createdDate: {type: Date, default: Date.now}
}, {collection: 'notifications', versionKey: false});

export default mongoose.model('notifications', NotificationSchema)
