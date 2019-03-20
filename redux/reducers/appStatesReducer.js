import * as types from '../types'
import { combineReducers } from 'redux';

const initialState = {
  signingIn: false,
  signingUp: false
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

export default combineReducers({
  signingIn,
  signingUp
})