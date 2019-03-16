const axios = require('axios')
const xml2js = require('xml-js').xml2js

const User = require('../models/User')
const BoardGame = require('../models/BoardGame')

const fetchBoardGameByBggId = require('../controllers/boardGameController')

const bggUri = `http://www.boardgamegeek.com/xmlapi/`

const BGGService = {
  fetchBggBoardGame: async (boardGames) => {
    let bggBoardGamesUri = ''
    if (typeof boardGames === 'string') {
      bggBoardGamesUri = `${bggUri}/boardgame/${boardGames}`
    } else {
      bggBoardGamesUri = `${bggUri}/boardgame/${boardGames.join(',')}`
    }
    console.log(bggBoardGamesUri)
    const result = await axios.get(bggBoardGamesUri)
    if (!result || result.status !== 200) throw new Error('Cannot fetch boardGames from bgg')

    const jsResult = xml2js(result.data, { compact: true })

    console.log(JSON.stringify(jsResult.boardGames))
    const boardGame = {
      bggId: jsResult.boardgames.boardgame._attributes.objectid,
      year: jsResult.boardgames.boardgame.yearpublished._text,
      minPlayers: jsResult.boardgames.boardgame.minplayers._text,
      maxPlayers: jsResult.boardgames.boardgame.maxplayers._text,
      playingTime: jsResult.boardgames.boardgame.playingtime._text,
      age: jsResult.boardgames.boardgame.age._text,
      thumbnail: jsResult.boardgames.boardgame.thumbnail._text,
      image: jsResult.boardgames.boardgame.image._text,
      category: jsResult.boardgames.boardgame.boardgamecategory.map(category => category._text).slice(0, 3),
      designer: jsResult.boardgames.boardgame.boardgamedesigner._text,
      originalName: jsResult.boardgames.boardgame.name.filter(name => name._attributes.primary)[0]._text
    }

    return boardGame
  },
  fetchBggUserCollection: async (bggUsername) => {
    const result = await axios.get(`${bggUri}/collection/${bggUsername}`)
    if (!result || result.status !== 200) throw new Error('Cannot fetch bgg user collection')

    const jsResult = xml2js(result.data, { compact: true })

    const userBoardGames = jsResult.items.item.filter(item => item._attributes.subtype === 'boardgame')

    const userBoardGamesResult = userBoardGames.map(boardGame => ({
      bggId: boardGame._attributes.objectid,
      originalName: boardGame.name._text,
      status: boardGame.status._attributes
    }))

    return userBoardGamesResult
  },
  importBggUserBoardGames: async (userId, bggUsername) => {
    const user = await User.findOne({ _id: userId })
    if (!user) throw new Error('User does not exists')

    //pobranie ustanionego bggUsername
    const bggCollection = await BGGService.fetchBggUserCollection(bggUsername)
    if (bggCollection.length === 0) throw new Error('There is no games in BGG collection')

    const bggCollectionIds = bggCollection.map(bg => bg.bggId)
    const existedBGs = await BoardGame.find({ bggId: { $in: bggCollectionIds } })

    const notExistedBG = bggCollectionIds.filter(id => !existedBGs.map(existedBG => existedBG.bggId).includes(id))

    console.log('NOT_EXISTED_BG', notExistedBG)
    const boardGames = await BGGService.fetchBggBoardGame(notExistedBG)
    console.log('RESULT', boardGames)
    // for (let boardGame of bggCollection) {
    //   const bgExists = await fetchBoardGameByBggId(boardGame.bggId)
    //   if (!bgExists) {
    //     const bggBoardGame = await fetchBggBoardGame(boardGame.bggId)
    //     const newBg = new BoardGame({
    //       name: boardGame.originalName,
    //       bggId: boardGame.bggId
    //     })
    //   }
    // }

  }
}

module.exports = BGGService