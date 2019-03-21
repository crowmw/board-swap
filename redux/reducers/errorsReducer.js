import * as types from '../types'
import { combineReducers } from 'redux';

const initialState = {
  signInError: null,
  signUpError: null,
  emailConfirmError: null
}

const signInError = (state = initialState.signInError, { type, payload }) => {
  switch (type) {
    case types.SIGN_IN_ERROR:
      return payload.error
    case types.SIGNED_IN:
      return initialState.signInError
    default:
      return state
  }
}

const signUpError = (state = initialState.signUpError, { type, payload }) => {
  switch (type) {
    case types.SIGN_UP_ERROR:
      return payload.error
    case types.SIGNED_UP:
      return initialState.signUpError
    default:
      return state
  }
}

const emailConfirmError = (state = initialState.emailConfirmError, { type, payload }) => {
  switch (type) {
    case types.EMAIL_CONFIRMED_ERROR:
      return payload.error
    case types.EMAIL_CONFIRMED:
      return initialState.emailConfirmError
    default:
      return state
  }
}

export default combineReducers({
  signInError,
  signUpError,
  emailConfirmError
})
