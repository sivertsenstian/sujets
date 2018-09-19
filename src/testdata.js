import { List, Map } from "immutable";
import * as _ from "lodash";
import * as mappers from "./mappers";

const raw_users = [
  { Id: "983b6c0bc9229d1572681bf6696abe01", Name: "Tari Rosales" },
  { Id: "97e97eacedf675bf1499f740c3cbd9e2", Name: "Cynthia Murray" },
  { Id: "b4004f839ec1a5ef8fceae88f6ce2a60", Name: "Consuela Farrell" },
  { Id: "ceb0c0feb71a4c72d9b791362b34eecf", Name: "Shad Lindsey" },
  { Id: "8448dd83df881c2873785307a9d70131", Name: "Dannette Mahoney" },
  { Id: "6cd7e5bb778a71ee9ac4ce642686d519", Name: "Mathilda Lin" },
  { Id: "720ea646e04ae80dc876657db3b311db", Name: "Orpha Burton" },
  { Id: "20922103a9815334315f2f75c283bcc0", Name: "Shamika Erickson" },
  { Id: "96bbf81cdb2954b7f9a4bf7c7840db8f", Name: "Rosena Raymond" },
  { Id: "6d16c182c0e6b66989da1c520bdc0957", Name: "Shad Jennings" },
  { Id: "75e27d0c1c8f1e0e37445619588007b3", Name: "Audie Holland" },
  { Id: "5e29abcfd690d9763383cabd8b4f7e5e", Name: "Anderson Suarez" },
  { Id: "78cebb43e9fc049299354ca2954aa4bb", Name: "Tamie Murray" },
  { Id: "5a1789d035afbcae9696bcf157a4dede", Name: "Audie Martinez" },
  { Id: "36f58231de446ea29aa94242443415cd", Name: "Kristin Trujillo" },
  { Id: "73dc0cb31117434b550d9819861edee7", Name: "Edison Duran" },
  { Id: "17aecccfbb51c945b0b1bbfeb1396367", Name: "Audie Greene" },
  { Id: "d98705264ab956ef8f7d6a858a96d348", Name: "Julianna Huffman" },
  { Id: "b8b1de122ab7d11541707e9da62a5f03", Name: "Debbi Jennings" },
  { Id: "3e42b5e959d060473b421ad41c30e93c", Name: "Bette Peterson" }
];

const raw_events = _.range(100, 110).map((e, i) => {
  return {
    Id: i,
    Name: `Fagmiles #${i}`,
    Date: new Date().toUTCString(),
    Location: "Stavanger",
    Description: "Some test description",
    Photo: "https://cdn-s3.si.com/s3fs-public/images/david-hasselhoff4.jpg",
    Status: _.sample([0, 1, 2]),
    Host: _.sample(raw_users),
    Organizer: _.sample(raw_users),
    Invited: _.sampleSize(raw_users, Math.floor(Math.random() * 10 + 1))
  };
});

export const events = List(raw_events.map(mappers.Event.from));

export const users = size =>
  List(_.sampleSize(raw_users, size).map(mappers.User.from));
