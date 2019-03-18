import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/rootReducer'
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initStore = (initialState = {}) =>
  createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)))