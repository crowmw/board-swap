const BoardGame = require('../models/BoardGame')

const prepareId = (o) => {
  o._id = o._id.toString()
  return o
}

module.exports = {
  fetchBoardGame(id) {
    return new Promise((resolve, reject) => {
      const boardGame = BoardGame.findOne({ _id: id }).populate('category')
      if (boardGame) {
        return resolve(prepareId(boardGame))
      }
      return reject('no games')
    })
  },
  fetchBoardGames({ find, skip, first, orderBy }) {
    return new Promise((resolve, reject) => {
      const boardGames = find
        ? BoardGame.find({ name: { "$regex": find, "$options": "i" } })
        : BoardGame.find({})
      boardGames.populate('category')

      if (skip) {
        boardGames.skip(skip)
      }

      if (first) {
        boardGames.limit(first)
      }

      if (orderBy) {
        switch (orderBy) {
          case 'name_ASC':
            boardGames.sort({ name: 'asc' })
          case 'name_DESC':
            boardGames.sort({ name: 'desc' })
          case 'createdAt_ASC':
            boardGames.sort({ createdAt: 'asc' })
          case 'createdAt_DESC':
            boardGames.sort({ createdAt: 'desc' })
          case 'updatedAt_ASC':
            boardGames.sort({ updatedAt: 'asc' })
          case 'updatedAt_DESC':
            boardGames.sort({ updatedAt: 'asc' })
        }
      }

      boardGames.exec((err, bgs) => {
        if (err) return reject(err)
        if (bgs) {
          return resolve(bgs.map(prepareId))
        }
        return resolve(bgs)
      })
    })
  },
  createBoardGame(boardGame) {
    return BoardGame.findOne({ name: boardGame.name }, (err, bg) => {
      if (err) return err

      if (bg) return 'boardGame exists'

      const newBoardGame = new BoardGame(boardGame)
      return newBoardGame.save(err => {
        if (err) return err

        return prepareId(newBoardGame)
      })
    })
  },
  updateBoardGame(boardGame) {
    console.log(boardGame)
    return BoardGame.findByIdAndUpdate({ _id: boardGame._id }, boardGame, (err, bg) => {
      if (err) return err
      return prepareId(bg)
    })
  }
}