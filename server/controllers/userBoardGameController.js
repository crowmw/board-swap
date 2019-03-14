const UserBoardGame = require('../models/UserBoardGame')
const prepareId = require('../utils/graphqlUtils').prepareId

module.exports = {
  fetchUserBoardGame(id) {
    return new Promise((resolve, reject) => {
      return UserBoardGame.findOne({ _id: id })
        .populate('user')
        .populate('boardGame')
        .exec((err, ubg) => {
          if (err) return reject(err)
          return resolve(prepareId(ubg))
        })
    })
  },
  fetchUserBoardGames() {
    return new Promise((resolve, reject) => {
      return UserBoardGame.find({})
        .populate('user')
        .populate('boardGame')
        .exec((err, ubgs) => {
          if (err) return reject(err)
          return resolve(ubgs.map(prepareId))
        })
    })
  }
}