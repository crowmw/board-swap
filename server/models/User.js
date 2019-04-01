const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs')

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: 'Please Supply an email address'
	},
	password: {
		type: String,
		required: 'Password is required'
	},
	role: { type: String, enum: ['user', 'moderator', 'admin'] },
	username: String,
	bggUsername: { type: String, default: null },
	verified: { type: Boolean, default: false },
	emailToken: { type: String, default: null },
	emailConfirmed: { type: Boolean, default: false },
	forgotPasswordToken: { type: String, default: null },
	city: { type: String, default: null },
	lat: { type: String, default: null },
	long: { type: String, default: null },
	boardGames: [{
		type: Schema.Types.ObjectId, ref: 'BoardGame'
	}],
	boardGamesWanted: [{
		type: Schema.Types.ObjectId, ref: 'BoardGame'
	}],
	boardGamesUnwanted: [{
		type: Schema.Types.ObjectId, ref: 'BoardGame'
	}],
	boardGamesToSwap: [{
		type: Schema.Types.ObjectId, ref: 'UserBoardGame'
	}]
})

userSchema.plugin(URLSlugs('username', { field: 'slug', update: true }))

module.exports = mongoose.model('User', userSchema)
