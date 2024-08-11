import { StyleSheet } from "react-native";

const BackIconContainerStyle = StyleSheet.create({
  backIconContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backIcon: {
    color: "#FFFFFF",
  },
  middleContent: {
    fontFamily: "Reddit Sans",
    fontWeight: "600",
    fontSize: 14,
    color: "#FFFFFF",
  },
  endContent: {
    fontFamily: "Reddit Sans",
    fontWeight: "600",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
export default BackIconContainerStyle;
