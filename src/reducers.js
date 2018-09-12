import { combineReducers } from "redux-immutable";
import router from "./reducer/router";
import common from "./reducer/common";
import event from "./reducer/event";
import events from "./reducer/events";

export default combineReducers({
  router,
  common,
  event,
  events
});
