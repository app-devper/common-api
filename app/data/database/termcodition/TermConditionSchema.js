import mongoose, { Schema } from 'mongoose'

const TermConditionSchema = new Schema({
  content: {type: String, trim: true, required: true},
  version: {type: String, trim: true, required: true},
  createdDate: {type: Date, default: Date.now}
}, {collection: 'term_conditions', versionKey: false});

export default mongoose.model('term_conditions', TermConditionSchema)
