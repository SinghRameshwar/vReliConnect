import { StyleSheet } from "react-native";

const EditEventNameStyle = StyleSheet.create({
  eventNameContainer: {
    marginTop: 10,
    borderColor: "red",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#262626",
  },
  eventNameTitle: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 16,
    color: "#E8E8E8",
  },
  eventNameTextInput: {
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: "#353535",
    borderRadius: 6,
    padding: 8,
    color: "#C1C1C1"
  },
});

export default EditEventNameStyle;
