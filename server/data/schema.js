const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
	type User {
		email: String
		fullname: String
		github: GitHub
	}
	type BoardGame {
		_id: String
		name: String
		originalName: String
		year: Int
		designer: String
		artist: String
		thumbnail: String
	}
	type GitHub {
		id: Int,
		name: String,
		email: String
	}
	type Query {
		profile: User
		boardGame(_id: String!): BoardGame
		boardGames: [BoardGame]
	}
	type Mutation {
		createUser(email: String!, fullname: String, password: String!): User
		login(email: String!, password: String!): User
		authGithub: User
		createBoardGame(name: String!, originalName: String, year: Int, designer: String, artist: String, thumbnail: String!): BoardGame
	}
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
