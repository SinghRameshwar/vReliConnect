import { StyleSheet } from "react-native";

const ProfileViewMessageModalStyle = StyleSheet.create({
  viewMessageWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  messageTitleContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  subMessageHeading: {
    width: "100%",
    marginBottom: 12,
    marginTop: 6,
    color: "#5e7e97",
    fontFamily: "Open-Sans",
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  messageContent: {
    height: "57%",
    color: "#4a6e8a",
    fontFamily: "Open-Sans",
    fontSize: 14,
    fontWeight: "bold",
    borderColor: "#2b4d66",
  },
});
export default ProfileViewMessageModalStyle;
