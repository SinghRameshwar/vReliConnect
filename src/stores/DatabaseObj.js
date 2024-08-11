import Realm from "realm";

class Profile extends Realm.Object {}
Profile.schema = {
  name: "Profile",
  primaryKey: "_id",
  properties: {
    _id: "string",
    name: { type: "string", optional: true },
    usermob: { type: "string", optional: true },
    useremail: { type: "string", optional: true },
    profle_image: { type: "string", optional: true },
    linking_qr_image: { type: "string", optional: true },
    contact_qr_image: { type: "string", optional: true },
  },
};

class Event extends Realm.Object {}
Event.schema = {
  name: "Event",
  primaryKey: "id",
  properties: {
    id: "string",
    eventType: { type: "string", optional: true },
    name: { type: "string", optional: true },
    meet_name: { type: "string", optional: true },
    image1: { type: "string", optional: true },
    image2: { type: "string", optional: true },
    event_mess: {
      type: "list",
      optional: true,
      objectType: "string",
      default: [],
    },
    event_tags: {
      type: "list",
      optional: true,
      objectType: "string",
      default: [],
    },
    start_dt: { type: "string", optional: true },
    end_dt: { type: "string", optional: true },
    status: { type: "string", optional: true },
    mob_num1: { type: "string", optional: true },
    mob_num2: { type: "string", optional: true },
    mail_Id1: { type: "string", optional: true },
    mail_Id2: { type: "string", optional: true },
  },
};

class Eventgroup extends Realm.Object {}
Eventgroup.schema = {
  name: "Eventgroup",
  primaryKey: "id",
  properties: {
    id: "string",
    eventId: { type: "string", optional: true },
    meet_name: { type: "string", optional: true },
    image1: { type: "string", optional: true },
    image2: { type: "string", optional: true },
    event_mess: {
      type: "list",
      optional: true,
      objectType: "string",
      default: [],
    },
    event_tags: {
      type: "list",
      optional: true,
      objectType: "string",
      default: [],
    },
    start_dt: { type: "string", optional: true },
    status: { type: "string", optional: true },
    mob_num1: { type: "string", optional: true },
    mob_num2: { type: "string", optional: true },
    mail_Id1: { type: "string", optional: true },
    mail_Id2: { type: "string", optional: true },
  },
};

export { Profile, Event, Eventgroup };
export const realm = new Realm({ schema: [Profile, Event, Eventgroup] });
