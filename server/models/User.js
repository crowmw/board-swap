const mongoose = require('mongoose')

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
	bggUsername: String,
	verified: Boolean,
	emailToken: String,
	emailConfirmed: Boolean,
	city: String,
	lat: String,
	long: String,
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

module.exports = mongoose.model('User', userSchema)
