import mongoose, { Schema } from 'mongoose'
import { INACTIVE } from "../../../domain/constant/Status";

const RestaurantSchema = new Schema({
  restaurantName: {
    type: String, trim: true
  },
  logo: String,
  logoPath: String,
  location: String,
  address: String,
  city: String,
  state: String,
  postcode: String,
  confirmAddress: {type: Boolean, default: false},
  email: {
    type: String, unique: true, lowercase: true, trim: true, required: true
  },
  password: {
    type: String, trim: true, lowercase: true, required: true
  },
  officialPhone: String,
  confirmOfficialPhone: {type: Boolean, default: false},
  phoneNumber: String,
  rate: Number,
  priceRate: Number,
  status: {type: String, default: INACTIVE},
  cuisineId: {type: Schema.Types.ObjectId, ref: 'cuisines'},
  placeId: String,
  accountId: String,
  appLanguage: {
    type: String, default: "en"
  },
  createdBy: {type: String},
  createdDate: {type: Date, default: Date.now},
  updatedBy: {type: String},
  updatedDate: {type: Date}
}, {collection: 'restaurants', versionKey: false});

RestaurantSchema.virtual('cuisine', {
  ref: 'cuisines',
  localField: 'cuisineId',
  foreignField: '_id',
  justOne: true
});

RestaurantSchema.set('toObject', {virtuals: true});
RestaurantSchema.set('toJSON', {virtuals: true});

export default mongoose.model('restaurants', RestaurantSchema)
