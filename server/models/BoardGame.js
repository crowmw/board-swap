const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const { Schema } = mongoose
mongoose.Promise = global.Promise

const boardGameSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
  originalName: {
    type: String,
    unique: true,
    trim: true,
    required: 'Please supply an original board game name'
  },
  year: Number,
  designer: String,
  minPlayers: Number,
  maxPlayers: Number,
  playingTime: Number,
  age: Number,
  thumbnail: String,
  image: String,
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
