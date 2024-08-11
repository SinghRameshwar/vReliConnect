import { StyleSheet } from "react-native";

const RemoveContactStyle = StyleSheet.create({
  removeContactContainer: {
    backgroundColor: "#262626",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: "#C1C1C1"
  },
  buttonWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    borderRadius: 6,
  },
  cancelBtnText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    marginVertical: 12,
    marginHorizontal: 60,
    color: "#C1C1C1"
  },
  removeBtn: {
    // backgroundColor: "#FF7B7B",
    borderRadius: 6
  },
  removeBtnText: {
    color: "white",
    fontSize: 16,
  },
});
export default RemoveContactStyle;
