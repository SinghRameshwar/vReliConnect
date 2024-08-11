import { StyleSheet } from "react-native";

const ActiveEventNameStyle = StyleSheet.create({
  toggleBtnWrapper: {
    backgroundColor: "#353535",
    marginHorizontal: 44,
    marginVertical: 16,
    borderRadius: 100,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnContentWrapper: {
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  btnContent: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 16,
    color: "#747474",
  },
  eventNameListContainer: {
    flexDirection: "row",
    backgroundColor: "#262626",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 16,
  },
  displayImg: {
    borderRadius: 40,
  },
  displayName: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    color: "#C1C1C1",
    marginLeft: 8,
  },
  activeDotContainer: {
    backgroundColor: "#95E2B6",
    width: 20,
    height: 20,
    borderColor: "#95E2B6",
    borderRadius: 50,
  },
  check: {
    padding: 4,
  },
  stop: {
    alignSelf: "center",
  },
  rightActionContainer: {
    flexDirection: "row",
    backgroundColor: "#151515",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 16,
  },
  actionButton: {
    paddingHorizontal: 12,
  },
  deleteActionButton: {
    borderRightWidth: 1,
    borderColor: "#747474",
    paddingHorizontal: 10,
  },
});
export default ActiveEventNameStyle;
