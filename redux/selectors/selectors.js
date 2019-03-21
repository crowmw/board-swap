import errorsSelector from "./errorsSelector";
import appStatusesSelector from "./appStatusesSelector";
import authSelector from './authSelector'
import profileSelector from './profileSelector'

export default {
  ...errorsSelector,
  ...appStatusesSelector,
  ...authSelector,
  ...profileSelector
}