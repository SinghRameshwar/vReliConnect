import { StyleSheet } from "react-native";

const RemoveEventStyle = StyleSheet.create({
  removeEventContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    flex: 1
  },
  removeEventContentContainer: {
    backgroundColor: "#262626",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  removeEventTitle: {
    color: "#C1C1C1",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
  },
  removeEventContent: {
    color: "#C1C1C1",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
  emailInput: {
    paddingHorizontal: 8,
    marginVertical: 6,
    backgroundColor: "#353535",
    marginTop: 20,
    borderRadius: 6,
    color: "#C1C1C1",
  },
  removeBtnContainer: {
    alignItems: "center",
    backgroundColor: "#FF7B7B",
    marginTop: 16,
    borderRadius: 6,
  },
  removeBtnText: {
    color: "#222222",
    marginVertical: 12,
  },
});

export default RemoveEventStyle;
