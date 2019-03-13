const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
	enum BoardGameOrderByEnum {
		name_ASC
		name_DESC
		createdAt_ASC
		createdAt_DESC
		updatedAt_ASC
		updatedAt_DESC
	}

	type User {
		_id: ID!
		email: String
		fullname: String
		boardGames: [BoardGame]
		boardGamesWanted: [BoardGame]
		boardGamesUnwanted: [BoardGame]
		boardGamesToSwap: [UserBoardGame]
	}
	type Category {
		_id: ID!
		name: String!
		description: String
		boardGames: [BoardGame]
	}
	type BoardGame {
		_id: ID!
		name: String
		originalName: String
		year: Int
		designer: String
		artist: String
		thumbnail: String
		createdAt: String
		updatedAt: String
		bggId: String
		category: [Category]
	}
	type UserBoardGame {
		_id: ID!
		boardGame: BoardGame
		user: User
		condition: String
		forSale: Boolean
		price: Float
		forSwap: Boolean
		shipping: Boolean
		shippingPrice: Float
		note: String
	}

	input BoardGameCreateInput {
		name: String!
		originalName: String 
		year: Int 
		designer: String 
		artist: String
		thumbnail: String!
		category: [String]
	}
	input BoardGameUpdateInput {
		_id: ID!,
		name: String,
		originalName: String,
		year: Int,
		designer: String,
		artist: String,
		thumbnail: String,
		bggId: String
	}

	type Query {
		user: User
		boardGame(_id: ID!): BoardGame
		boardGames(find: String, skip: Int, first: Int, orderBy: BoardGameOrderByEnum): [BoardGame]!
		category(_id: ID!): Category
		categories: [Category]
		userBoardGame(_id: ID!): UserBoardGame
		userBoardGames: [UserBoardGame]!
	}

	type Mutation {
		createUser(email: String!, fullname: String, password: String!): User
		login(email: String!, password: String!): User
		addUserBoardGame(_id: String!): User
		createBoardGame(boardGame: BoardGameCreateInput): BoardGame
		updateBoardGame(boardGame: BoardGameUpdateInput): BoardGame
	}
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
