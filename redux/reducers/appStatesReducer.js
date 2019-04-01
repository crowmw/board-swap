import * as types from '../types'
import { combineReducers } from 'redux';

const initialState = {
  signingIn: false,
  signingUp: false,
  fetchingBoardGames: false
}

const signingIn = (state = initialState.signingIn, { type, payload }) => {
  switch (type) {
    case types.SIGNING_IN:
      return true
    case types.SIGNED_IN:
    case types.SIGN_IN_ERROR:
      return false
    default:
      return state
  }
}

const signingUp = (state = initialState.signingUp, { type, payload }) => {
  switch (type) {
    case types.SIGNING_UP:
      return true
    case types.SIGNED_UP:
    case types.SIGN_UP_ERROR:
      return false
    default:
      return state
  }
}

const fetchingBoardGames = (state = initialState.fetchingBoardGames, { type, payload }) => {
  switch (type) {
    case types.BOARD_GAMES_FETCHING:
      return true
    case types.BOARD_GAMES_FETCHING_SUCCESS:
    case types.BOARD_GAMES_FETCHING_ERROR:
      return false
    default:
      return state
  }
}

export default combineReducers({
  signingIn,
  signingUp,
  fetchingBoardGames
})