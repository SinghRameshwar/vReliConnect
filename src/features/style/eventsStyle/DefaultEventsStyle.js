import { StyleSheet } from "react-native";

const DefaultEventsStyle = StyleSheet.create({
  DefaultEventsContainer: {
    flex: 1,
  },
  editProfileHeadingContainer: {
    height: 74,
  },
  profileHeading: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    fontWeight: "600",
    color: "#E8E8E8",
    lineHeight: 18,
  },
  contentWrapper: {
    backgroundColor: "#262626",
    flex: 1,
  },
  bgImgEventContainer: {
    backgroundColor: "#151515",
    height: 350,
    width: "100%",
    alignItems: "center",
  },
  eventBgImg: {
    height: 350,
  },
  eventImg: {
    marginTop: -290,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#262626",
    marginHorizontal: 16,
  },
  upperCardDetailContainer: {
    height: 125,
    marginTop: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  lowerCardDetailContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    height: 90,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  calendarIconContainer: {
    marginTop: 16,
    height: 64,
    width: 64,
    borderRadius: 40,
  },
  calendarIcon: {
    alignSelf: "center",
    marginVertical: 16,
    color: "#E8E8FF",
  },
  editIconContainer: {
    marginTop: 24,
    borderRadius: 40,
  },
  editIcon: {
    color: "#7A7776",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  calendarAndEditIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  titleAndCopyEventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  eventTitle: {
    marginTop: 12,
    fontWeight: "700",
    lineHeight: 18,
    fontSize: 14,
    color: "#fe552a",
  },
  copyIconContainer: {
    marginTop: -10,
    borderRadius: 40,
  },
  copyIcon: {
    color: "#747474",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  titelContent: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "#FCFCFC",
  },
});
export default DefaultEventsStyle;
