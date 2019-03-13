const User = require('../models/User')
const passport = require('passport')
const userController = require('../controllers/userController')
const boardGameController = require('../controllers/boardGameController')
const userBoardGameController = require('../controllers/userBoardGameController')
const categoryController = require('../controllers/categoryController')

const prepareId = (o) => {
	o._id = o._id.toString()
	return o
}

module.exports = {
	Query: {
		user(root, args, context) {
			return new Promise((resolve, reject) => {
				if (context.user) {
					return resolve(prepareId(context.user))
				}

				return reject('Not Authenticated!')
			})
		},
		boardGame: (root, { _id }) => boardGameController.fetchBoardGame(_id),
		boardGames: (root, { find, skip, first, orderBy }) => boardGameController.fetchBoardGames({ find, skip, first, orderBy }),
		category: (root, { _id }) => categoryController.fetchCategory(_id),
		categories: () => categoryController.fetchCategories(),
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
		addUserBoardGame: (root, { _id }, { user }) => {
			return new Promise((resolve, reject) => {
				if (user) {
					return resolve(userController.putUserBoardGame(user._id, _id))
				}
				return reject('Not Authenticated!')
			})
		},
		createBoardGame: (root, arguments) => boardGameController.createBoardGame(arguments.boardGame),
		updateBoardGame: (root, arguments) => boardGameController.updateBoardGame(arguments.boardGame)
	}
}
