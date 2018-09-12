import { List } from "immutable"; 
import * as actions from "../actions";

const initialState = List();

export default (state = initialState, action = {}) => { 
  switch (action.type) {
  case actions.EVENTS_PAGE_LOADED:
    return action.payload;
  case actions.EVENTS_PAGE_UNLOADED:
    return initialState;
  default:
    return state;
  }
};
