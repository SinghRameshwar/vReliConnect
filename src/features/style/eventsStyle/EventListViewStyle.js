import { StyleSheet } from "react-native";

const EventListViewStyle = StyleSheet.create({
  generalNetworkContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#262626",
    paddingVertical: 12,
  },
  generalNetworkTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: "#E8E8E8",
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editTitle: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 18,
    marginRight: 2,
    color: "#E8E8E8",
  },
  linearGradient: {
    // flex: 1,
    // padding: 16,
  },
  safeAreaView: {
    // flex: 1,
  },
  openEventsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 5,
    backgroundColor: "#262626",
  },
  openEventsTitle: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    color: "#E8E8E8",
  },
  swipableEventsContainer: {
    marginTop: 8,
    height: 140,
    width: 180,
    borderRadius: 20,
  },
  swipableEventDateTitleContainer: {
    backgroundColor: "#151515",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  eventTitle: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    color: "#C1C1C1",
  },
  dateTitle: {
    marginTop: 8,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 12,
    color: "#646464",
  },
  swipableEnterExitTitleContainer: {
    flexDirection: "row",
    backgroundColor: "#353535",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  enterTitle: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    color: "#C4C4C4",
  },
  eventBorderLine: {
    marginLeft: 16,
    borderWidth: 1,
    marginTop: 2,
    height: 16,
    borderColor: "#747474",
    backgroundColor: "#747474",
  },
  arrow: {
    marginLeft: 5,
    marginTop: 2,
  },
  file: {
    marginLeft: 22,
    marginTop: 2,
  },
  copy: {
    marginLeft: 16,
    marginTop: 2,
  },
  pastEventsContainer: {
    marginTop: 5,
    backgroundColor: "#262626",
  },
  pastEventsHeading: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    color: "#E8E8E8",
  },
  passEventListContainer: {
    backgroundColor: "#353535",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 5,
  },
  pastEventTitle: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    color: "#C1C1C1",
  },
  pastEventDate: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#646464",
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 5,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "#151515",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "#151515",
    right: 0,
  },
});
export default EventListViewStyle;
