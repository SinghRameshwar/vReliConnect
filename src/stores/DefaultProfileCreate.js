import { newProfile } from "../templateScreens/constants/eventData";
import { realm } from "./DatabaseObj";

// create default profile
export const DefaultProfileCreate = () => {
  try {
    const profile = realm.objects("Profile");
    if (profile.length <= 0) {
      realm.write(() => {
        realm.create("Profile", newProfile);
      });
    }
  } catch (error) {
    console.log("Error On Create Profile:-    ", error);
  }
};
