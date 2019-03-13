const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const boardGameController = require('../controllers/boardGameController')
const userBoardGameController = require('../controllers/userBoardGameController')
const categoryController = require('../controllers/categoryController')
const authenticated = require('../utils/graphqlUtils').authenticated

module.exports = {
	Query: {
		user: authenticated((root, args, context) => userController.fetchUser(context.user._id)),
		boardGame: (root, { _id }) => boardGameController.fetchBoardGame(_id),
		boardGames: (root, { find, skip, first, orderBy }) => boardGameController.fetchBoardGames({ find, skip, first, orderBy }),
		category: (root, { _id }) => categoryController.fetchCategory(_id),
		categories: () => categoryController.fetchCategories(),
		userBoardGame: (root, { _id }) => userBoardGameController.fetchUserBoardGame(_id),
		userBoardGames: () => userBoardGameController.fetchUserBoardGames()
	},
	Mutation: {
		login: (root, { email, password }, { login }) => authController.login(email, password),
		createUser: (root, { email, fullname, password }, { login }) => authController.createUser(email, password),
		addUserBoardGame: authenticated((root, { _id }, { userId }) => userController.putUserBoardGame(userId, _id)),
		createBoardGame: (root, { boardGame }) => boardGameController.createBoardGame(boardGame),
		updateBoardGame: (root, { boardGame }) => boardGameController.updateBoardGame(boardGame)
	}
}
