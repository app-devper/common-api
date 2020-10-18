import mongoose, { Schema } from 'mongoose'

const CuisineSchema = new Schema({
  name: {type: String},
  isEnable: {type: Boolean, default: false},
}, {collection: 'cuisines', versionKey: false});

export default mongoose.model('cuisines', CuisineSchema)
