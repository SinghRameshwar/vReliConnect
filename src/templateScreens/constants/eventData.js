import { format } from "date-fns";

const default_message = `Dear Sir,\n\nI hope this email finds you well.\nI wanted to extend a warm invitation to our upcoming event, "Networking Gala 2024." \n\n\nWarm regards,\nRameshwar Singh`;
const defaultTag = ["#HLTH", "#V7", "#Venture7", "#Linkedin", "#HIMSS"];

const newEvent = {
  id: new Date() + "",
  name: "General Event",
  eventType: "",
  meet_name: "",
  image1: "",
  image2: "",
  event_mess: [default_message, default_message, default_message],
  event_tags: defaultTag,
  start_dt: format(new Date(), "yyyy-MM-dd"),
  end_dt: "",
  status: "active",
};

const newGroupOfEvent = {
  id: "",
  eventId: "",
  meet_name: "",
  image1: "",
  image2: "",
  event_mess: [],
  event_tags: [],
  start_dt: format(new Date(), "yyyy-MM-dd"),
  status: "",
  mob_num1: "",
  mob_num2: "",
  mail_Id1: "",
  mail_Id2: "",
};

const newProfile = {
  _id: "1",
  name: "",
  usermob: "",
  useremail: "",
  profle_image: "",
  linking_qr_image: "",
  contact_qr_image: "",
};

export { newEvent, newProfile, newGroupOfEvent };
