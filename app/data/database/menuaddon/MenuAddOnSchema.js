import mongoose, { Schema } from 'mongoose'

const MenuAddOnSchema = new Schema({
  restaurantId: {type: Schema.Types.ObjectId, require: true, index: true, ref: 'restaurants'},
  menuItemId: {type: Schema.Types.ObjectId, require: true, index: true, ref: 'menu_items'},
  name: {
    type: String, trim: true, require: true
  },
  description: {
    type: String, trim: true
  },
  require: {type: Boolean, default: false},
  optionCount: {type: Number, default: 1},
  options: [{
    name: String,
    price: Number
  }],
  createdBy: {type: String},
  createdDate: {type: Date, default: Date.now},
  updatedBy: {type: String},
  updatedDate: {type: Date, default: Date.now}
}, {collection: 'menu_add_ons', versionKey: false});

export default mongoose.model('menu_add_ons', MenuAddOnSchema)
