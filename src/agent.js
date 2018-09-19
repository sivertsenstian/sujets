import { List } from "immutable";
import _superagent from "superagent";
import superagentPromise from "superagent-promise";
import * as mappers from "./mappers";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT =
  process.env.NODE_ENV === "development"
    ? "https://miles-events.azurewebsites.net/"
    : "/api";
const responseBody = res => {
  return Promise.resolve(res.body);
};

const requests = {
  delete: url => superagent.del(`${API_ROOT}${url}`).then(responseBody),
  get: (url, mapper) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .then(responseBody)
      .then(mapper),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody),
  file: (url, name, file, fields) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .attach(name, file)
      .field(fields)
      .then(responseBody),
  raw: url => superagent.get(`${url}`).then(responseBody),
  link: url => `${API_ROOT}${url}`
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
  Event
};
