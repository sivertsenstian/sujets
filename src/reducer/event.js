import { Map } from "immutable";
import * as actions from "../actions";
import { MODAL } from "../enum";
import { Event, Moodle } from "../mappers";

const initialState = Map({
  data: Event.initial(),
  moodle: Moodle.initial(),
  pollForDate: false,
  modal: false,
  moodleModal: false
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.EVENT_PAGE_LOADED:
      return action.payload;
    case actions.EVENT_PAGE_UNLOADED:
      return initialState;
    case actions.CREATE_EVENT_MODAL_LOADED:
      return initialState;
    case actions.TOGGLE_MODAL:
      switch (action.modal) {
        case MODAL.CREATE_EVENT:
          return state.set("modal", action.open);
        case MODAL.CREATE_MOODLE:
          return state.set("moodleModal", action.open);
        default:
          return state;
      }
    case actions.UPDATE_EVENT_VALUE:
      const { keys, value } = action;
      return state.setIn(["data", ...keys], value);
    case actions.UPDATE_EVENT_INVITE_GUEST:
      const { user } = action;
      return state.updateIn(["data", "invited"], invited => invited.push(user));
    case actions.UPDATE_EVENT_REMOVE_GUEST:
      const { id } = action;
      return state.updateIn(["data", "invited"], invited => {
        let index = invited.findIndex(u => u.id === id);
        return invited.delete(index);
      });
    case actions.CREATE_EVENT:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
