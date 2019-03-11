const UserBoardGame = require('../models/BoardGame')

module.exports = {
  fetchUserBoardGame(id) {
    return new Promise((resolve, reject) => {
      return UserBoardGame.findOne({ _id: id }, (err, ubg) => {
        if (err) return reject(err)
        return resolve(ubg)
      })
    })
  },
  fetchUserBoardGames() {
    return new Promise((resolve, reject) => {
      return UserBoardGame.find({}, (err, ubgs) => {
        if (err) return reject(err)
        return resolve(ubgs)
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