import { StyleSheet } from "react-native";

const ProfileViewTagsModalStyle = StyleSheet.create({
  tagsTitle: {
    marginTop: 28,
    marginLeft: 30,
    fontSize: 30,
    color: "#2b4d66",
    fontFamily: "Open-Sans",
    fontWeight: "bold",
  },
  viewTagsWrapper: {
    height: 320,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2b4d66",
    backgroundColor: "white",
    marginTop: 16,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: "#2b4d66",
    fontFamily: "Open-Sans",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  cancelBtnWrapper: {
    borderWidth: 2,
    borderColor: "#3e6c8f",
    borderRadius: 15,
  },
  saveBtnWrapper: {
    borderWidth: 2,
    borderColor: "#3e6c8f",
    backgroundColor: "#3e6c8f",
    borderRadius: 15,
  },
  cancelBtnText: {
    color: "#3e6c8f",
    marginHorizontal: 50,
    marginVertical: 12,
    fontFamily: "Open-Sans",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveBtnText: {
    color: "white",
    marginHorizontal: 50,
    marginVertical: 12,
    fontFamily: "Open-Sans",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default ProfileViewTagsModalStyle;
