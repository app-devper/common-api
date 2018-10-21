/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'

/**
 * Merchant Schema
 */
let MerchantsSchema = new Schema({
  merchantName: String,
  merchantType: String,
  merchantAddress: String,
  status: String,
  latitude: String,
  longitude: String,
  contactNumber: String,
  webSite: String,
  pageFacebook: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  createdDate: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
  updatedDate: { type: Date }
})

// Build the merchants Model:
export default mongoose.model('merchants', MerchantsSchema)
