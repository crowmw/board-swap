const User = require('../models/User')
const passport = require('passport')
const boardGameController = require('../controllers/boardGameController')
const userBoardGameController = require('../controllers/userBoardGameController')

const prepare = (o) => {
	o._id = o._id.toString()
	return o
}

module.exports = {
	Query: {
		profile(root, args, context) {
			return new Promise((resolve, reject) => {
				if (context.user) {
					return resolve(context.user)
				}

				return reject('Not Authenticated!')
			})
		},
		boardGame: (root, { _id }) => boardGameController.fetchPost(_id),
		boardGames: (root, { find, skip, first, orderBy }) => boardGameController.fetchPosts({ find, skip, first, orderBy }),
		userBoardGame: (root, { _id }) => userBoardGameController.fetchUserBoardGame(_id),
		userBoardGames: () => userBoardGameController.fetchUserBoardGames()
	},
	Mutation: {
		createUser(root, { email, fullname, password }, { login }) {
			const user = new User({ email, fullname })

			return new Promise((resolve, reject) => {
				return User.register(user, password, err => {
					if (err) {
						reject(err)
					} else {
						login(user, () => resolve(user))
					}
				})
			})
		},
		login(root, { email, password }, { login }) {
			return new Promise((resolve, reject) => {
				return User.authenticate()(email, password, (err, user) => {
					// user returns false if username / email incorrect
					if (user) {
						login(user, () => resolve(user))
					} else {
						reject('Email / Password Incorrect')
					}
				})
			})
		},
		authGithub(root, args, { statusCode, setHeader, res }) {
			return new Promise((resolve, reject) => {
				return passport.authenticate('github', (err, user) => {
					if (user) {
						resolve(user)
					} else {
						reject(err)
					}
				})({}, { statusCode, setHeader, end })
			})
		},
		createBoardGame: boardGameController.createBoardGame
	}
}
