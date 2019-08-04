/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'

/**
 * Message Schema
 */
const MessageSchema = new Schema({
  key: { type: String, required: true, trim: true, index: true },
  message: { type: String, required: true, trim: true },
  type: { type: String, required: true, max: 100, trim: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
}, { collection: 'messages', versionKey: false });

// Build the Message Model:
export default mongoose.model('messages', MessageSchema)
