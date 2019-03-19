import { SIGNED_IN, SIGN_OUT } from '../types'
import { combineReducers } from 'redux';

const initialState = {
  token: null,
  signedIn: false
}

const token = (state = initialState.token, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return payload.token
    case SIGN_OUT:
      return initialState.token
    default:
      return state
  }
}

const signedIn = (state = initialState.signedIn, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return true
    case SIGN_OUT:
      return false
    default:
      return state
  }
}

const authReducer = combineReducers({
  token,
  signedIn
})

export default authReducer