const BoardGame = require('../models/BoardGame')

module.exports = {
  fetchPost(id) {
    return new Promise((resolve, reject) => {
      const boardGames = BoardGame.findOne({ _id: id })
      if (boardGames) {
        return resolve(boardGames)
      }
      return reject('no games')
    })
  },
  fetchPosts() {
    return new Promise((resolve, reject) => {
      const boardGame = BoardGame.find({})
      if (boardGame) {
        return resolve(boardGame)
      }
      return reject('no game')
    })
  },
  createBoardGame(root, args) {
    return new Promise((resolve, reject) => {
      return BoardGame.findOne({ name: args.name }, (err, boardGame) => {
        if (err) return reject(err)

        if (boardGame) return reject('boardGame exists')

        const newBoardGame = new BoardGame(args)
        return newBoardGame.save(err => {
          if (err) return reject(err)

          return resolve(newBoardGame)
        })
      })
    })
  }
}