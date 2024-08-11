import { StyleSheet, Dimensions } from "react-native";

const HomeContainerStyle = StyleSheet.create({
  homescreenContainer: {
    flex: 1,
  },
  bottomTabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#353535",
    marginBottom: 15,
    paddingBottom: 7,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 50,
    marginTop: -10,
  },
  iconContainer: {
    flex: 1,
  },
  icon: {
    marginTop: 6,
    alignSelf: "center",
  },
  iconText: {
    color: "#C1C1C1",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    fontFamily: "Reddit Sans",
  },
  addIconContainer: {
    alignSelf: "center",
    zIndex: 1,
    marginTop: -15,
  },
  addIconImg: {
    backgroundColor: "#000000",
    borderRadius: 40,
    width: 60,
    height: 60,
    marginBottom: -20,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
export default HomeContainerStyle;
