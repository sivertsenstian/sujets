import { List } from "immutable";
import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import * as mappers from "./mappers";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT =
  process.env.NODE_ENV === "development"
    ? "http://localhost/api"
    : "/api";
const responseBody = res => res.body;

const requests = {
  delete: url => superagent.del(`${API_ROOT}${url}`).then(responseBody),
  get: (url, mapper) => superagent.get(`${API_ROOT}${url}`).then(mapper(responseBody)),
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
  update: event =>
    requests.put(`/events/${event.id}`, mappers.Event.to(event)),
  byId: id => requests.get(`/events/${id}`, mappers.Event.from),
  all: () => requests.get(`/events`, result => List(result.map(mappers.Event.from)))
};

export default {
  Event
};
