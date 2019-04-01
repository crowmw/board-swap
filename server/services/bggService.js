const axios = require('axios')
const xml2js = require('xml-js').xml2js

const User = require('../models/User')
const BoardGame = require('../models/BoardGame')
const Category = require('../models/Category')

const bggUri = `http://www.boardgamegeek.com/xmlapi/`

const BGGService = {
  fetchBggBoardGame: async (boardGames) => {
    const bggBoardGamesUri = `${bggUri}/boardgame/${boardGames}`
    const result = await axios.get(bggBoardGamesUri)
    if (!result || result.status !== 200) throw new Error('Cannot fetch boardGames from bgg')

    const jsResult = xml2js(result.data, { compact: true })

    const boardGame = {
      bggId: jsResult.boardgames.boardgame._attributes.objectid,
      year: jsResult.boardgames.boardgame.yearpublished._text,
      minPlayers: jsResult.boardgames.boardgame.minplayers._text,
      maxPlayers: jsResult.boardgames.boardgame.maxplayers._text,
      playingTime: jsResult.boardgames.boardgame.playingtime._text,
      age: jsResult.boardgames.boardgame.age._text,
      thumbnail: jsResult.boardgames.boardgame.thumbnail
        ? jsResult.boardgames.boardgame.thumbnail._text
        : undefined,
      image: jsResult.boardgames.boardgame.image
        ? jsResult.boardgames.boardgame.image._text
        : undefined,
      category: jsResult.boardgames.boardgame.boardgamecategory
        ? jsResult.boardgames.boardgame.boardgamecategory.length
          ? jsResult.boardgames.boardgame.boardgamecategory.map(category => category._text).slice(0, 3)
          : [jsResult.boardgames.boardgame.boardgamecategory._text]
        : [],
      designer: jsResult.boardgames.boardgame.boardgamedesigner
        ? jsResult.boardgames.boardgame.boardgamedesigner._text
        : undefined,
      originalName: jsResult.boardgames.boardgame.name.length
        ? jsResult.boardgames.boardgame.name.filter(name => name._attributes.primary)[0]._text
        : jsResult.boardgames.boardgame.name._text
    }

    return boardGame
  },
  fetchBggBoardGames: async (bggIds) => {
    //grupowanie zapytań aby nie przeciążyć bgg
    const idsCount = bggIds.length
    const groupItemsLength = 100
    let groups = []
    for (let group = 0; group < Math.ceil(idsCount / groupItemsLength); group++) {
      groups[group] = bggIds.slice(group * groupItemsLength, (group + 1) * groupItemsLength)
    }

    let boardGames = []
    for (let g of groups) {
      const bggBoardGamesUri = `${bggUri}/boardgame/${g.join(',')}`
      axios.defaults.timeout = 300000;
      const result = await axios.get(bggBoardGamesUri)
      if (!result || result.status !== 200) throw new Error('Cannot fetch boardGames from bgg')
      const jsResult = xml2js(result.data, { compact: true })
      for (let boardGame of jsResult.boardgames.boardgame) {
        boardGames.push({
          bggId: boardGame._attributes.objectid,
          year: boardGame.yearpublished._text,
          minPlayers: boardGame.minplayers._text,
          maxPlayers: boardGame.maxplayers._text,
          playingTime: boardGame.playingtime._text,
          age: boardGame.age._text,
          thumbnail: boardGame.thumbnail
            ? boardGame.thumbnail._text
            : undefined,
          image: boardGame.image
            ? boardGame.image._text
            : undefined,
          category: boardGame.boardgamecategory
            ? boardGame.boardgamecategory.length
              ? boardGame.boardgamecategory.map(category => category._text).slice(0, 3)
              : [boardGame.boardgamecategory._text]
            : [],
          designer: boardGame.boardgamedesigner
            ? boardGame.boardgamedesigner._text
            : undefined,
          originalName: boardGame.name.length
            ? boardGame.name.filter(name => name._attributes.primary)[0]._text
            : boardGame.name._text
        })
      }
    }

    return boardGames
  },
  //status: own, rated, played, comment, trade, want, wantintrade, whishlist, wanttoplay, wanttobuy, prevowned
  fetchBggUserCollection: async (bggUsername, status) => {
    axios.defaults.timeout = 300000;
    const result = await axios.get(`${bggUri}/collection/${bggUsername}${status ? `?${status}=1` : ''}`)
    if (!result || result.status !== 200) throw new Error('Cannot fetch bgg user collection')

    const jsResult = xml2js(result.data, { compact: true })
    if (jsResult.errors) throw new Error(jsResult.errors.error.message._text)

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

    //pobranie ustawionego bggUsername
    const bggCollection = await BGGService.fetchBggUserCollection(bggUsername)
    if (bggCollection.length === 0) throw new Error('There is no games in BGG collection')
    const bggCollectionIds = bggCollection.map(bg => bg.bggId)
    const existedBGs = await BoardGame.find({ bggId: { $in: bggCollectionIds } })

    const notExistedBG = bggCollectionIds.filter(id => !existedBGs.map(existedBG => existedBG.bggId).includes(id))
    if (notExistedBG.length) {
      const boardGames = await BGGService.fetchBggBoardGames(notExistedBG)

      //dodaj kategorie które nie istnieją
      const notExistedCategories = boardGames.reduce((prev, curr, index) => {
        if (index === 1) {
          return [...new Set(prev.category, ...curr.category)]
        }
        return [...new Set([...prev, ...curr.category])]
      })

      let categoriesToSave = []
      for (let cat of notExistedCategories) {
        const c = await Category.findOne({ name: cat })
        if (!c) {
          categoriesToSave.push(new Category({
            name: cat
          }))
        }
      }

      await Category.insertMany(categoriesToSave)

      //Add new boardgames
      let bgToSave = []
      for (let bg of boardGames) {
        const boardGameCategories = await Category.find({ name: { $in: bg.category } })
        const categoryIds = boardGameCategories.map(bgc => bgc._id)

        bgToSave.push(new BoardGame({
          bggId: bg.bggId,
          year: bg.year,
          minPlayers: bg.minPlayers,
          maxPlayers: bg.maxPlayers,
          playingTime: bg.playingTime,
          age: bg.age,
          thumbnail: bg.thumbnail,
          image: bg.image,
          designer: bg.designer,
          originalName: bg.originalName,
          name: bg.originalName,
          category: categoryIds
        }))
      }

      const savedBoardGames = await BoardGame.insertMany(bgToSave)

      //Add new board games to categories
      for (let savedBG of savedBoardGames) {
        for (let categoryId of savedBG.category) {
          const cat = await Category.findOne({ _id: categoryId })
          cat.boardGames.push(savedBG._id)
          cat.save()
        }
      }
    }

    //TODO: Przydzielanie gier userowi do właściwych tablic
    return true
  }
}

module.exports = BGGService