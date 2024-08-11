import { newEvent } from "../templateScreens/constants/eventData";
import { realm } from "./DatabaseObj";

// create first default Event
export const DefaultEventCreate = () => {
  try {
    const events = realm.objects("Event");
    if (events.length <= 0) {
      newEvent.eventType = "general";
      realm.write(() => {
        realm.create("Event", newEvent);
      });
    }
  } catch (error) {
    console.log("Getting Error On Create Default Event:- ", error);
  }
};
