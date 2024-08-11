import { StyleSheet } from "react-native";

const AddMessageStyle = StyleSheet.create({
  messageContainer: {
    marginTop: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: "#262626",
  },
  messageHeading: {
    lineHeight: 16,
    color: "#E8E8E8",
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "Reddit Sans",
    fontWeight: "600",
  },
  textMessage: {
    fontFamily: "Reddit Sans",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: "#E8E8E8",
    flex: 1,
  },
});
export default AddMessageStyle;
