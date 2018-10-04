import { fromJS } from "immutable";
import * as actions from "../actions";

const initialState = fromJS({
  redirectTo: null,
  viewChangeCounter: 0,
  user: null,
  token: null
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.APP_LOAD:
      return state
        .set("appLoaded", true)
        .set("token", action.token || null)
        .set("user", action.user ? action.user : null);
    case actions.APP_LOAD:
      return state.set("appLoaded", true);
    case actions.SIGN_OUT:
      return state.set("user", null).set("token", null);
    case actions.REDIRECT_TO:
      return state.set("redirectTo", action.to);
    case actions.REDIRECT:
      return state.set("redirectTo", null);
    case actions.EVENTS_PAGE_UNLOADED:
    case actions.LOGIN_PAGE_LOADED:
      return state.update("viewChangeCounter", value => value + 1);
    default:
      return state;
  }
};
