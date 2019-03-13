const UserBoardGame = require('../models/UserBoardGame')

const prepareId = (o) => {
  o._id = o._id.toString()
  return o
}

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
  // fetchPosts() {
  //   return new Promise((resolve, reject) => {
  //     const boardGame = BoardGame.find({})
  //     if (boardGame) {
  //       return resolve(boardGame)
  //     }
  //     return reject('no game')
  //   })
  // },
  // createBoardGame(root, args) {
  //   return new Promise((resolve, reject) => {
  //     return BoardGame.findOne({ name: args.name }, (err, boardGame) => {
  //       if (err) return reject(err)

  //       if (boardGame) return reject('boardGame exists')

  //       const newBoardGame = new BoardGame(args)
  //       return newBoardGame.save(err => {
  //         if (err) return reject(err)

  //         return resolve(newBoardGame)
  //       })
  //     })
  //   })
  // }
}