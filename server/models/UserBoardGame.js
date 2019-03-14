const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const { Schema } = mongoose
mongoose.Promise = global.Promise

const userBoardGameSchema = new Schema({
  boardGame: { type: Schema.Types.ObjectId, ref: 'BoardGame' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  condition: String,
  forSale: { type: Boolean, default: false },
  price: Number,
  forSwap: { type: Boolean, default: true },
  shipping: { type: Boolean, default: false },
  shippingPrice: Number,
  note: { type: String, enum: ['used', 'new', 'incemplete'] },
},
  {
    timestamps: true
  }
)

userBoardGameSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('UserBoardGame', userBoardGameSchema)
