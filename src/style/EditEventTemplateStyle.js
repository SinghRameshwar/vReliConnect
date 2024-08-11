import { StyleSheet } from "react-native";

const EditEventTemplateStyle = StyleSheet.create({
  newEventTemplateContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  startDateContainer: {
    alignItems: "center",
  },
  calendarIcon: {
    color: "#84FFB5",
    marginTop: 10,
  },
  startDateText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
    color: "#C1C1C1",
    marginTop: 6,
  },
  newEventInputContainer: {
    marginTop: 14,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
    backgroundColor: "#262626",
  },
  eventNameHeading: {
    fontSize: 16,
    paddingLeft: 4,
    lineHeight: 16,
    color: "#E8E8E8",
    fontWeight: "600",
  },
  editIcon: {
    marginTop: -8,
    padding: 8,
  },
  textMessage: {
    fontFamily: "Open-Sans",
    fontSize: 14,
    fontWeight: "400",
    color: "#C1C1C1"
  },
  displayHashtagsWrapper: {
    backgroundColor: "#262626",
    marginTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  tagsHeading: {
    lineHeight: 16,
    paddingLeft: 6,
    color: "#E8E8E8",
    fontSize: 16,
    fontFamily: "Reddit Sans",
    fontWeight: "600",
  },
  hashtagsHeadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hashtagEditIcon: {
    marginRight: -10,
    padding: 14,
    marginRight: 4,
  },
  closeEventBtnText: {
    color: "#C4C4C4",
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
  },
  closeEventBtnContainer: {
    marginTop: -20,
    alignItems: "center",
    marginHorizontal: 20,
    borderColor: "#747474",
    borderWidth: 1,
    borderRadius: 54,
  },
  eventHeadingText: {
    fontFamily: "Open-Sans",
    fontSize: 18,
    fontWeight: "bold",
    color: "#2b4d66",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
    borderColor: "#2b4d66",
    paddingLeft: 15,
    borderRadius: 15,
    borderWidth: 2,
  },
  messageWrapper: {
    marginHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#2b4d66",
  },
});
export default EditEventTemplateStyle;
