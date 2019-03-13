const mongoose = require('mongoose')
const validator = require('validator')
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const { Schema } = mongoose
mongoose.Promise = global.Promise

const boardGameSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: 'Please supply an board game name'
  },
  originalName: String,
  year: Number,
  designer: String,
  artist: String,
  thumbnail: String,
  bggId: String,
  category: [
    { type: Schema.Types.ObjectId, ref: 'Category' }
  ]
},
  {
    timestamps: true
  }
)

boardGameSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('BoardGame', boardGameSchema)
