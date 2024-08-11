import { realm } from "../../stores/DatabaseObj";
import Share from "react-native-share";

// When Event Select databsae set status
export const selectEventForLive = (indexKey) => {
  const events = realm.objects("Event");
  realm.write(() => {
    events.forEach((event) => {
      const updatedStatus = event.id === indexKey.id ? "active" : "";
      realm.create(
        "Event",
        { id: event.id, status: updatedStatus },
        true
      );
    });
  });
  return true;
};


// Email Or Share Data
export const shareDetails = async (data) => {
  try {
    const commaSeparatedString = data?.event_tags;
    // Share the icon image via email
    await Share.open({
      url: data?.image1,
      email: data?.mail_Id1,
      subject: data?.event_messtitle,
      message: data?.event_mess + "\n\n" + commaSeparatedString,
    });
  } catch (error) {
    console.error("Error sharing photo:", error);
  }
};

// Function to delete an event by id
export const deleteEventById = (eventId) => {
  try {
    realm.write(() => {
      const eventToDelete = realm.objectForPrimaryKey("Eventgroup", eventId);
      if (eventToDelete) {
        realm.delete(eventToDelete);
      } else {
        console.log("Event not found");
      }
    });
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};