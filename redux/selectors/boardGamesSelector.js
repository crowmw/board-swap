import categoriesSelector from "./categoriesSelector";

const getBoardGames = state => state.boardGames.byId

const getBoardGamesWithCategories = state => {
  const boardGames = getBoardGames(state)
  if (boardGames) {
    const result = Object.values(boardGames).map(bg => {
      return {
        ...bg,
        category: bg.category.map(catKey => categoriesSelector.getCategory(state, catKey))
      }
    })
    return result
  }
}

const getBoardGamesIds = state => {
  const bgs = getBoardGames(state)
  return bgs && Object.keys(bgs)
}

export default {
  getBoardGames,
  getBoardGamesIds,
  getBoardGamesWithCategories
}