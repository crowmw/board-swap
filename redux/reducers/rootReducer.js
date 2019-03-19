import { combineReducers } from 'redux'
import authReducer from './authReducer'
import appStatesReducer from './appStatesReducer'
import errorsReducer from './errorsReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  appStates: appStatesReducer,
  errors: errorsReducer
})

export default rootReducer