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
    date: null,
    status: EVENT_STATUS.PLANNED,
    host: { id: null },
    organizer: { id: null },
    invited: []
  });
};

const eventFromDTO = ({
  Id,
  Name,
  Date,
  Description,
  Status,
  Host,
  Organizer,
  Invited
}) => {
  return Map({
    id: Id,
    name: Name,
    description: Description,
    date: Date,
    status: Status,
    host: userFromDTO(Host),
    organizer: userFromDTO(Organizer),
    invited: List(Invited.map(userFromDTO))
  });
};

const eventToDTO = ({
  id,
  name,
  date,
  description,
  status,
  host,
  organizer,
  invited
}) => {
  return {
    Id: id,
    Name: name,
    Description: description,
    Date: date,
    Status: status,
    Host: userToDTO(host),
    Organizer: userToDTO(organizer),
    Invited: invited.map(userToDTO)
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
