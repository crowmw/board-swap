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
		github: GitHub
		boardGames: [BoardGame]
		boardGamesWanted: [BoardGame]
		boardGamesUnwanted: [BoardGame]
		boardGamesToSwap: [UserBoardGame]
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
	type GitHub {
		id: Int,
		name: String,
		email: String
	}

	input BoardGameInput {
		name: String!
		originalName: String 
		year: Int 
		designer: String 
		artist: String
		thumbnail: String!
	}

	type Query {
		user: User
		boardGame(_id: ID!): BoardGame
		boardGames(find: String, skip: Int, first: Int, orderBy: BoardGameOrderByEnum): [BoardGame]!
		userBoardGame(_id: ID!): UserBoardGame
		userBoardGames: [UserBoardGame]!
	}
	type Mutation {
		createUser(email: String!, fullname: String, password: String!): User
		login(email: String!, password: String!): User
		authGithub: User
		createBoardGame(boardGame: BoardGameInput): BoardGame
	}
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
