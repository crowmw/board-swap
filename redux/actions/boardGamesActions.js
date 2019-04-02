import api from '../../lib/api'
import {
  BOARD_GAMES_FETCHING,
  BOARD_GAMES_FETCHING_SUCCESS,
  BOARD_GAMES_FETCHING_ERROR,
  BOARD_GAME_FETCHING,
  BOARD_GAME_FETCHING_SUCCESS,
  BOARD_GAME_FETCHING_ERROR
} from '../types';
import { normalize } from 'normalizr';
import normalizrSchema from '../../lib/normalizr'
import normalizr from '../../lib/normalizr';

const fetchBoardGames = async ({ find, first = 48, skip = 0, orderBy = 'name_ASC' }) => {
  // dispatch({ type: BOARD_GAMES_FETCHING })

  const query = `{
  boardGames(${find ? `find: ${find}, ` : ''}first: ${first}, skip: ${skip}, orderBy: ${orderBy}) {
    _id
    slug
    name
    thumbnail
    category {
      _id
      name
    }
    year
  }}`

  try {
    const result = await api.graphql(query)
    if (result) {
      return result.boardGames
      // const normalized = normalize(result.boardGames, [normalizrSchema.boardGame])
      // dispatch({ type: BOARD_GAMES_FETCHING_SUCCESS, payload: { boardGames: normalized.entities.boardGame, categories: normalized.entities.category } })
    }
  } catch (err) {
    // dispatch({ type: BOARD_GAMES_FETCHING_ERROR, payload: { error: err.message } })
  }
}

const fetchBoardGame = async (slug) => {
  // dispatch({ type: BOARD_GAME_FETCHING })
  // console.log('ACTION', slug)
  const query = `{
    boardGame(slug: "${slug}") {
      _id
      slug
      name
      originalName
      thumbnail
      category {
        _id
        name
      }
      year
      bggId
      minPlayers
      maxPlayers
      playingTime
      age
      designer
    }
  }`

  try {
    const result = await api.graphql(query)
    // console.log('RESULT', result)
    if (result) {
      const normalized = normalize(result.boardGame, normalizrSchema.boardGame)
      // dispatch({ type: BOARD_GAME_FETCHING_SUCCESS, payload: { boardGame: normalized.entities.boardGame, categories: normalized.entities.category } })
      return { boardGame: result.boardGame }
    }
  } catch (err) {
    console.error(err)
    // dispatch({ type: BOARD_GAME_FETCHING_ERROR, payload: { error: err.message } })
  }
}

export default {
  fetchBoardGame,
  fetchBoardGames
}