import { combineReducers } from 'redux'
import { SIGNED_IN } from '../types';

const initialState = {
  userId: null
}

const userId = (state = initialState.userId, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return payload.userId
    default:
      return state
  }
}

export default combineReducers({
  userId
})