import { StyleSheet } from "react-native";

const BottomNavbarStyle = StyleSheet.create({
  bottomAddContainer: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 24,
    zIndex: 1,
    marginLeft: 8,
  },
  bottomIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0E0E0E",
    marginBottom: 6,
    paddingBottom: 8,
    marginHorizontal: 10,
    borderRadius: 50,
    marginTop: -23,
  },
  iconContainer: {
    flex: 1,
  },
  icon: {
    marginTop: 6,
    alignSelf: "center",
  },
  iconText: {
    marginTop: 2,
    alignSelf: "center",
    color: "#C1C1C1",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    fontFamily: "Reddit Sans",
  },
  bottomView: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#0E0E0E",
    marginBottom: 10,
    height: 4,
    width: 140,
    borderRadius: 20,
  },
});

export default BottomNavbarStyle;
