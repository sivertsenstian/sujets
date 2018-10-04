import { List, Map } from "immutable";
import { EVENT_STATUS } from "./enum";

// USER
const user = () => {
  return Map({
    id: null,
    name: ""
  });
};

const userFromDTO = ({ Id, Name }) => {
  return Map({
    id: Id,
    name: Name
  });
};

const userToDTO = ({ id, name }) => {
  return {
    Id: id,
    Name: name
  };
};

// EVENT
const event = () => {
  return Map({
    id: null,
    name: "",
    description: "",
    photo: "",
    location: "",
    time: { start: null, end: null },
    date: null,
    status: EVENT_STATUS.PLANNED,
    host: { id: null },
    organizer: { id: null },
    invited: List()
  });
};

const eventFromDTO = ({
  id,
  name,
  Date,
  StartTime,
  EndTime,
  description,
  Photo,
  Location,
  Status,
  Host,
  Organizer,
  Invited
}) => {
  return Map({
    id,
    name,
    description,
    photo: Photo,
    location: Location,
    time: { start: StartTime, end: EndTime },
    date: Date,
    status: Status,
    host: { id: null },
    organizer: { id: null },
    invited: List()
    // host: userFromDTO(Host),
    // organizer: userFromDTO(Organizer),
    // invited: List(Invited.map(userFromDTO))
  });
};

const eventToDTO = ({
  id,
  name,
  date,
  time,
  description,
  photo,
  location,
  status,
  host,
  organizer,
  invited
}) => {
  return {
    Id: id,
    Name: name,
    Description: description,
    Photo: photo,
    Location: location,
    StartTime: time.start,
    EndTime: time.end,
    Date: date,
    Status: status,
    Host: userToDTO(host),
    Organizer: userToDTO(organizer),
    Invited: invited.map(userToDTO)
  };
};

// MOODLE
const moodle = () => {
  return Map({
    id: null,
    options: [],
    selected: null
  });
};

const moodleFromDTO = ({ Id, Options, Selected }) => {
  return Map({
    id: Id,
    options: Options,
    selected: Selected
  });
};

const moodleToDTO = ({ id, options, selected, answers }) => {
  return {
    Id: id,
    Options: options,
    Selected: selected
  };
};

// OPTION
const option = () => {
  return Map({
    id: null,
    date: null,
    answers: []
  });
};

const optionFromDTO = ({ Id, Date, Answers }) => {
  return Map({
    id: Id,
    date: Date,
    answers: Answers
  });
};

const optionToDTO = ({ id, date, answers }) => {
  return {
    Id: id,
    Date: date,
    Answers: answers
  };
};

// ANSWER
const answer = () => {
  return Map({
    id: null,
    user: null,
    available: false
  });
};

const answerFromDTO = ({ Id, Invite, IsAvailable }) => {
  return Map({
    id: Id,
    user: Invite,
    available: IsAvailable
  });
};

const answerToDTO = ({ id, user, available }) => {
  return {
    Id: id,
    Invite: user,
    IsAvailable: available
  };
};

export const User = {
  initial: user,
  from: userFromDTO,
  to: userToDTO
};

export const Event = {
  initial: event,
  from: eventFromDTO,
  to: eventToDTO
};

export const Moodle = {
  initial: moodle,
  from: moodleFromDTO,
  to: moodleToDTO
};

export const Option = {
  initial: option,
  from: optionFromDTO,
  to: optionToDTO
};

export const Answer = {
  initial: answer,
  from: answerFromDTO,
  to: answerToDTO
};
