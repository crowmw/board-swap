import { combineReducers } from 'redux'
import authReducer from './authReducer'
import appStatesReducer from './appStatesReducer'
import errorsReducer from './errorsReducer'
import profileReducer from './profileReducer'
import boardGames from './boardGamesReducer'
import boardGamesReducer from './boardGamesReducer';
import categoriesReducer from './categoriesReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  profile: profileReducer,
  appStates: appStatesReducer,
  errors: errorsReducer,
  boardGames: boardGamesReducer,
  categories: categoriesReducer
})

export default rootReducer