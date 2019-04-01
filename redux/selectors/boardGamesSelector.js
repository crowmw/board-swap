import categoriesSelector from "./categoriesSelector";

const getBoardGames = state => state.boardGames.byId

const getBoardGameBySlug = (state, slug) => {
  const boardGames = getBoardGames(state)
  if (boardGames) {
    const bg = Object.values(boardGames).find(bg => bg.slug === slug)
    return bg
  }
}

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
  getBoardGamesWithCategories,
  getBoardGameBySlug
}