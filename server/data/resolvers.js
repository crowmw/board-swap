const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const boardGameController = require('../controllers/boardGameController')
const userBoardGameController = require('../controllers/userBoardGameController')
const categoryController = require('../controllers/categoryController')
const { authenticated, isAdmin } = require('../utils/graphqlUtils')

const bggService = require('../services/bggService')

module.exports = {
	Query: {
		user: isAdmin((root, { userId }) => userController.fetchUser(userId)),
		boardGame: (root, { slug }) => boardGameController.fetchBoardGame(slug),
		boardGames: (root, { find, skip, first, orderBy }) => boardGameController.fetchBoardGames({ find, skip, first, orderBy }),
		category: (root, { _id }) => categoryController.fetchCategory(_id),
		categories: () => categoryController.fetchCategories(),
		userBoardGame: (root, { _id }) => userBoardGameController.fetchUserBoardGame(_id),
		userBoardGames: () => userBoardGameController.fetchUserBoardGames(),
		bggBoardGame: (root, { bggId }) => bggService.fetchBggBoardGame(bggId),
		bggUserCollection: (root, { bggUsername }) => bggService.fetchBggUserCollection(bggUsername)
	},
	Mutation: {
		addUserBoardGame: authenticated((root, { _id }, { userId }) => userController.putUserBoardGame(userId, _id)),
		createBoardGame: (root, { boardGame }) => boardGameController.createBoardGame(boardGame),
		updateBoardGame: (root, { boardGame }) => boardGameController.updateBoardGame(boardGame),
		importBggUserBoardGames: (root, { bggUsername }, { userId }) => bggService.importBggUserBoardGames(userId, bggUsername),
		seedBoardGamesFromBggUser: isAdmin((root, { bggUsername }) => bggService.seedBoardGamesFromBggUser(bggUsername))
	}
}
