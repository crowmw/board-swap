import { SIGNED_IN, SIGN_OUT } from '../types'
import { combineReducers } from 'redux';

const initialState = {
  token: null,
  signedIn: false,
  emailConfirmed: false
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

const emailConfirmed = (state = initialState.emailConfirmed, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return payload.profile.emailConfirmed
    case SIGN_OUT:
      return initialState.emailConfirmed
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

export default combineReducers({
  token,
  signedIn,
  emailConfirmed
})
