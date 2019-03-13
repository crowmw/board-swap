const User = require('../models/User')
const BoardGame = require('../models/BoardGame')
const prepareId = require('../utils/graphqlUtils').prepareId

module.exports = {
  fetchUser: async (id) => {
    try {
      const user = await User.findById(id).populate('boardGames')
      if (!user) throw new Error('User not found')

      return prepareId(user)
    } catch (err) {
      throw err
    }
  },
  putUserBoardGame: async (userId, boardGameId) => {
    try {
      const boardGame = await BoardGame.findOne({ _id: boardGameId })
      if (!boardGame) throw new Error('Boardgame does not exists!')

      const result = await User.updateOne({ _id: userId }, { $push: { boardGames: boardGameId } })
      if (!result.ok) throw new Error('Cannot update users boardgames')

      const user = await User.findOne({ _id: userId }).populate('boardGames')
      if (!user) throw new Error('User not found')

      return prepareId(user)
    } catch (err) {
      return err
    }
  }
}