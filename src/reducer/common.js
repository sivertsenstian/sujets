import { fromJS } from "immutable"; 
import * as actions from "../actions";

const initialState = fromJS({ redirectTo: null, viewChangeCounter: 0 });

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.APP_LOAD:
      return state.set("appLoaded", true);
    case actions.REDIRECT:
      return state.set("redirectTo", null);
    case actions.EVENTS_PAGE_UNLOADED:
      return state.update("viewChangeCounter", value => value + 1);
    default:
      return state;
  }
};
