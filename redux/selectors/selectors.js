import errorsSelector from "./errorsSelector";
import appStatusesSelector from "./appStatusesSelector";
import authSelector from './authSelector'
import profileSelector from './profileSelector'
import boardGamesSelector from './boardGamesSelector'
import categoriesSelector from './categoriesSelector'

export default {
  ...errorsSelector,
  ...appStatusesSelector,
  ...authSelector,
  ...profileSelector,
  ...boardGamesSelector,
  ...categoriesSelector
}