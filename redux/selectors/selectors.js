import errorsSelector from "./errorsSelector";
import appStatusesSelector from "./appStatusesSelector";
import authSelector from './authSelector'

export default {
  ...errorsSelector,
  ...appStatusesSelector,
  ...authSelector
}