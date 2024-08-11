import Contacts from "react-native-contacts";
import { requestContactsPermission } from "./requestContactsPermission";

export const getContactsByPhoneNumber = async (phoneNumber) => {
  try {
    // Check if permission is granted
    const permissionGranted = await requestContactsPermission();
    if (!permissionGranted) {
      return [];
    }

    // Retrieve contacts by phone number
    const contacts = await Contacts.getContactsByPhoneNumber(phoneNumber);
    console.log("Contacts found:", contacts);
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};
