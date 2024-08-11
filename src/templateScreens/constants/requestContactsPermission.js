import { PermissionsAndroid } from "react-native";

// Function to request permission to access contacts
export const requestContactsPermission = async () => {
  try {
    // Request read permission
    const readGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: "Contacts Permission",
        message: "This app needs access to your contacts.",
        buttonPositive: "OK",
      }
    );

    // Request write permission
    const writeGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      {
        title: "Contacts Permission",
        message: "This app needs access to your contacts.",
        buttonPositive: "OK",
      }
    );

    // Check if both permissions are granted
    if (
      readGranted === PermissionsAndroid.RESULTS.GRANTED &&
      writeGranted === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("Contacts permissions granted");
      return true;
    } else {
      console.log("Contacts permissions denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
