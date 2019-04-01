const BoardGame = require('../models/BoardGame')

const prepareId = (o) => {
  o._id = o._id.toString()
  return o
}

module.exports = {
  fetchBoardGame: async (id) => {
    try {
      const boardGame = await BoardGame.findOne({ _id: id }).populate('category')
      if (!boardGame) throw new Error('BoardGame not found')
      return prepareId(boardGame)
    } catch (err) {
      throw err
    }
  },
  fetchBoardGameByBggId: async (bggId) => {
    try {
      const boardGame = await BoardGame.findOne({ bggId: bggId }).populate('category')
      if (!boardGame) throw new Error('BoardGame not found')
      return prepareId(boardGame)
    } catch (err) {
      throw err
    }
  },
  fetchBoardGames: async ({ find, skip, first, orderBy }) => {
    try {
      const boardGames = find
        ? BoardGame.find({ name: { "$regex": find, "$options": "i" } })
        : BoardGame.find({})
      boardGames.populate('category')

      if (orderBy) {
        switch (orderBy) {
          case 'name_ASC':
            boardGames.collation({ locale: 'pl', strength: 2 }).sort({ name: 1 })
            break
          case 'name_DESC':
            boardGames.collation({ locale: 'pl', strength: 2 }).sort({ name: -1 })
            break
          case 'createdAt_ASC':
            boardGames.sort({ createdAt: 'asc' })
            break
          case 'createdAt_DESC':
            boardGames.sort({ createdAt: 'desc' })
            break
          case 'updatedAt_ASC':
            boardGames.sort({ updatedAt: 'asc' })
            break
          case 'updatedAt_DESC':
            boardGames.sort({ updatedAt: 'asc' })
            break
          default:
            boardGames.collation({ locale: 'pl', strength: 2 }).sort({ name: 1 })
        }
      }

      if (first) {
        boardGames.limit(first)
      }

      if (skip) {
        boardGames.skip(skip)
      }

      const result = await boardGames.exec()

      if (!result) throw new Error('BoardGames not found')

      return result.map(prepareId)
    } catch (err) {
      throw err
    }
  },
  createBoardGame: async (boardGame) => {
    const existingBoardGame = await BoardGame.findOne({ name: boardGame.name })
    if (existingBoardGame) throw new Error('BoardGame name is already taken')

    const newBoardGame = new BoardGame(boardGame)
    const result = await newBoardGame.save()
    if (!result) throw new Error('Error occured on save new BoardGame!')

    return prepareId(result)
  },
  updateBoardGame: async (boardGame) => {
    const result = await BoardGame.findByIdAndUpdate({ _id: boardGame._id }, boardGame)
    if (!result) throw new Error('Error occured on update new BoardGame!')
    if (err) return err
    return prepareId(bg)
  }
}