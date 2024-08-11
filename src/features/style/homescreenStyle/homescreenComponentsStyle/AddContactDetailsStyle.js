import { StyleSheet, Dimensions } from "react-native";

const AddContactDetailsStyle = StyleSheet.create({
  addContactDetailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#262626",
  },
  addContactDetailsHeading: {
    fontSize: 16,
    color: "#E8E8E8",
    fontWeight: "600",
    lineHeight: 18,
    marginBottom: 8,
  },
  addContactInputField: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "300",
    color: "#E8E8E8",
    borderRadius: 4,
    backgroundColor: "#353535",
  },
  addMobileNumContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  toggleIcon: {
    marginLeft: 20,
    backgroundColor: "#353535",
    borderRadius: 4,
    padding: 4,
  },
  secondaryMobileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  messageWrapper: {
    borderRadius: 18,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#3e6c8f",
  },
  textMessage: {
    fontFamily: "Reddit Sans",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "400",
    color: "#E8E8E8",
    flex: 1,
  },
  displayHashtagsWrapper: {
    backgroundColor: "#262626",
    marginTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  hashtag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#EAF8FF",
    marginHorizontal: 5,
    marginVertical: 6,
    borderRadius: 22,
    fontFamily: "Open-Sans",
    fontSize: 15,
    fontWeight: "bold",
    color: "#1f3648",
  },
  buttonContainer: {
    flexDirection: "row",
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    alignItems: "flex-end",
    backgroundColor: "#353535",
  },
  editIcon: {
    padding: 8,
  },
});

export default AddContactDetailsStyle;
