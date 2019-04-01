const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs')
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
  boardGames: [{ type: Schema.Types.ObjectId, ref: 'BoardGame' }]
},
  {
    timestamps: true
  }
)

categorySchema.plugin(mongodbErrorHandler)

categorySchema.plugin(URLSlugs('name', { field: 'slug', update: true }))

module.exports = mongoose.model('Category', categorySchema)
