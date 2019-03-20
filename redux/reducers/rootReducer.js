import { combineReducers } from 'redux'
import authReducer from './authReducer'
import appStatesReducer from './appStatesReducer'
import errorsReducer from './errorsReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  profile: profileReducer,
  appStates: appStatesReducer,
  errors: errorsReducer
})

export default rootReducer