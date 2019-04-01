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

const fetchBoardGames = ({ find, first = 30, skip = 0, orderBy = 'name_ASC' }) => async (dispatch, getState) => {
  dispatch({ type: BOARD_GAMES_FETCHING })

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
      const normalized = normalize(result.boardGames, [normalizrSchema.boardGame])
      dispatch({ type: BOARD_GAMES_FETCHING_SUCCESS, payload: { boardGames: normalized.entities.boardGame, categories: normalized.entities.category } })
    }
  } catch (err) {
    dispatch({ type: BOARD_GAMES_FETCHING_ERROR, payload: { error: err.message } })
  }
}

const fetchBoardGame = (slug) => async (dispatch, getState) => {
  dispatch({ type: BOARD_GAME_FETCHING })

  const query = `{
    boardGame(slug: ${slug}) {
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
    if (result) {
      const normalized = normalize(result.boardGame, normalizrSchema.boardGame)
      dispatch({ type: BOARD_GAME_FETCHING_SUCCESS, payload: { boardGame: normalized.entities.boardGame, categories: normalized.entities.category } })
    }
  } catch (err) {
    dispatch({ type: BOARD_GAME_FETCHING_ERROR, payload: { error: err.message } })
  }
}

export default {
  fetchBoardGame,
  fetchBoardGames
}