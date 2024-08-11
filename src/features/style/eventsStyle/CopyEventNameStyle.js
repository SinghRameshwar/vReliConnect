import { StyleSheet } from "react-native";

const CopyEventNameStyle = StyleSheet.create({
  headerElementsWrapper: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
    marginVertical: 20,
  },
  backIcon: {
    marginTop: 8,
    color: "#FFFFFF",
  },
  eventHeading: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    color: "#E8E8E8",
  },
  save: {
    marginTop: 10,
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
  },
  displayStartDateContainer: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 6,
  },
  startDateTitle: {
    marginTop: 6,
    fontWeight: "800",
    fontSize: 13,
    lineHeight: 16,
    color: "#FFFFFF",
  },
  textMessage: {
    fontFamily: "Reddit Sans",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: "#E8E8E8",
  },
  messageHeading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E8E8E8",
    lineHeight: 15,
  },
  tagsHeading: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#E8E8E8",
    lineHeight: 15,
  },
  addIcon: {
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "#353535",
    borderRadius: 24,
  },
  crossIcon: {
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 4,
    paddingRight: 5,
    color: "#E8E8E8",
  },
  closeEventContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#747474"
  },
  closeEventText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#C4C4C4",
    marginVertical: 12
  },
  defaultEventNameContainer: {
  
  },
  defaultEventName: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: "#C1C1C1"
  }
});

export default CopyEventNameStyle;
