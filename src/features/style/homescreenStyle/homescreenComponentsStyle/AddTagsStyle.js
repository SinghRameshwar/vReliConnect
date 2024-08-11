import { StyleSheet, Dimensions } from "react-native";

const AddTagsStyle = StyleSheet.create({
  addTagsContainer: {
    backgroundColor: "#262626",
    marginTop: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  tagsHeading: {
    paddingBottom: 4,
    lineHeight: 18,
    paddingLeft: 10,
    color: "#E8E8E8",
    fontSize: 16,
    fontFamily: "Reddit Sans",
    fontWeight: "600",
  },
  hashtag: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 3,
    backgroundColor: "#353535",
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 24,
  },
  hashtagContent: {
    color: "#E8E8E8",
    fontWeight: "400",
    fontFamily: "Reddit Sans",
    fontSize: 14,
  },
  crossIcon: {
    marginTop: -30,
    color: "#7A7776",
  },
  addIcon: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#353535",
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 24,
  },
  crossIcon: {
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 4,
    paddingRight: 5,
    color: "#E8E8E8",
  },
});

export default AddTagsStyle;
