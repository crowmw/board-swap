const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const { Schema } = mongoose
mongoose.Promise = global.Promise

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: 'Please supply an category name'
  },
  description: String,
  year: Number,
  boardGames: [{ type: Schema.Types.ObjectId, ref: 'BoardGame' }]
},
  {
    timestamps: true
  }
)

categorySchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('Category', categorySchema)
