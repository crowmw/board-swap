import { AUTHENTICATE, DEAUTHENTICATE } from '../types'
import { combineReducers } from 'redux';

const initialState = {
  token: null
}

const token = (state = initialState.token, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE:
      return payload.token
    case DEAUTHENTICATE:
      return initialState.token
    default:
      return state
  }
}

const authReducer = combineReducers({
  token
})

export default authReducer