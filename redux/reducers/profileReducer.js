import { combineReducers } from 'redux'
import { SIGNED_IN } from '../types';

const initialState = {
  userId: null,
  email: null,
  username: null,
  verified: null,
  city: null,
  role: null,
  bggUsername: null
}

const userId = (state = initialState.userId, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return payload.userId
    default:
      return state
  }
}

const email = (state = initialState.email, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return payload.profile.email
    default:
      return state
  }
}

const username = (state = initialState.username, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return payload.profile.username
    default:
      return state
  }
}

const bggUsername = (state = initialState.bggUsername, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return payload.profile.bggUsername
    default:
      return state
  }
}

const city = (state = initialState.city, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return payload.profile.city
    default:
      return state
  }
}

const role = (state = initialState.role, { type, payload }) => {
  switch (type) {
    case SIGNED_IN:
      return payload.profile.role
    default:
      return state
  }
}

export default combineReducers({
  userId,
  email,
  username,
  bggUsername,
  city,
  role
})