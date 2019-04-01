import { BOARD_GAMES_FETCHING_SUCCESS } from "../types";
import { combineReducers } from "redux";

const initialState = {
  byId: {},
}

const byId = (state = initialState.byId, { type, payload }) => {
  switch (type) {
    case BOARD_GAMES_FETCHING_SUCCESS:
      return { ...state, ...payload.boardGames }
    default:
      return state
  }
}

export default combineReducers({
  byId,
})