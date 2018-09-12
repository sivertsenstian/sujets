import { Map, List } from "immutable"; 
import * as actions from "../actions";
import {Event} from "../mappers";
import {MODAL} from "../enum";

const initialState = Map({
  data: Event.initial(),
  modal: false
});

export default (state = initialState, action = {}) => { 
  switch (action.type) {
  case actions.EVENT_PAGE_LOADED:
    return action.payload;
  case actions.EVENT_PAGE_UNLOADED:
    return initialState;
  case actions.CREATE_EVENT_MODAL_LOADED:
    const [users] = action.payload;
    return state.setIn(["data", "invited"], users);
  case actions.TOGGLE_MODAL:
    if (action.modal === MODAL.CREATE_EVENT) {
      return state.set("modal", action.open);
    }
    return state;
  default:
    return state;
  }
};
