import mongoose, { Schema } from 'mongoose'
import { INACTIVE } from "../../../core/constant/Status";

const MenuItemSchema = new Schema({
  restaurantId: {type: Schema.Types.ObjectId, index: true, ref: 'restaurants'},
  menuGroupId: {type: String, index: true},
  sequence: Number,
  name: {
    type: String, trim: true, require: true
  },
  description: String,
  percentTax: Number,
  price: Number,
  delivery: {type: Boolean, default: false},
  pickup: {type: Boolean, default: true},
  dineIn: {type: Boolean, default: true},
  imageM: String,
  imageMPath: String,
  imageL: String,
  imageLPath: String,
  cookingTime: Number,
  outOfOrder: {type: Boolean, default: false},
  taxType: Number,
  createdBy: {type: String},
  createdDate: {type: Date, default: Date.now},
  updatedBy: {type: String},
  updatedDate: {type: Date, default: Date.now}
}, {collection: 'menu_items', versionKey: false});

export default mongoose.model('menu_items', MenuItemSchema)
