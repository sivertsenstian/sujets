import { List } from "immutable";
import _superagent from "superagent";
import superagentPromise from "superagent-promise";
import * as mappers from "./mappers";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT =
  process.env.NODE_ENV === "development"
    ? "https://localhost:5001"
    : "https://miles-events.azurewebsites.net/";

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set("authorization", `Bearer ${token}`);
  } else {
    console.log(req);
    console.log("NO TOKEN DEFINED!!");
  }
};

const responseBody = res => {
  return Promise.resolve(res.body);
};

const requests = {
  delete: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: (url, mapper) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody)
      .then(mapper),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const Event = {
  create: event => requests.post(`/events`, mappers.Event.to(event)),
  update: event => requests.put(`/events/${event.id}`, mappers.Event.to(event)),
  byId: id => requests.get(`/events/${id}`, mappers.Event.from),
  all: () =>
    requests.get(`/events`, result => {
      let events = result.items.map(mappers.Event.from);
      return List(events);
    })
};

export default {
  Event,
  setToken: _token => {
    token = _token;
  }
};
