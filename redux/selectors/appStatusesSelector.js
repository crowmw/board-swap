const getSignInProgress = state => state.appStates.signingIn
const getSignUpInProgress = state => state.appStates.signingUp

export default {
  getSignInProgress,
  getSignUpInProgress
}