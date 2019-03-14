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
		username: String
		bggUsername: String
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
		minPlayers: String
		maxPlayers: String
		playingTime: Int
		age: Int
		thumbnail: String
		image: String
		createdAt: String
		updatedAt: String
		bggId: ID
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
	type AuthData {
		userId: ID!
		token: String!
		tokenExpiration: Int!
	}

	input BoardGameCreateInput {
		name: String!
		originalName: String 
		year: Int 
		designer: String 
		minPlayers: String
		maxPlayers: String
		playingTime: Int
		age: Int
		thumbnail: String
		image: String
		bggId: String
		category: [String]
	}
	input BoardGameUpdateInput {
		_id: ID!,
		name: String,
		originalName: String,
		year: Int,
		designer: String,
		minPlayers: String
		maxPlayers: String
		playingTime: Int
		age: Int
		thumbnail: String,
		image: String
		bggId: ID
	}

	type Query {
		user: User
		boardGame(_id: ID!): BoardGame
		boardGames(find: String, skip: Int, first: Int, orderBy: BoardGameOrderByEnum): [BoardGame]!
		category(_id: ID!): Category
		categories: [Category]
		userBoardGame(_id: ID!): UserBoardGame
		userBoardGames: [UserBoardGame]!
		bggBoardGame(bggId: String!): BoardGame
		bggUserCollection(bggUsername: String!): String
	}

	type Mutation {
		createUser(email: String!, password: String!): User
		login(email: String!, password: String!): AuthData!
		addUserBoardGame(_id: String!): User
		createBoardGame(boardGame: BoardGameCreateInput): BoardGame
		updateBoardGame(boardGame: BoardGameUpdateInput): BoardGame

	}
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
