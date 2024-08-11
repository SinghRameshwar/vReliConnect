import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RemoveContactStyle from "../../style/logsStyle/RemoveContactStyle";

const RemoveContact = ({ setBottomSheetVisible, deleteItem }) => {
  const [selectedButton, setSelectedButton] = useState("Remove");

  const handleCancel = () => {
    setSelectedButton("Cancel");
    setTimeout(() => {
      setBottomSheetVisible(false);
    }, 100);
  };

  const handleRemove = () => {
    setSelectedButton("Remove");
    deleteItem();
  };

  return (
    <TouchableWithoutFeedback onPress={() => setBottomSheetVisible(false)}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={RemoveContactStyle.removeContactContainer}>
          <Text style={RemoveContactStyle.title}>Remove Contact ?</Text>
          <View style={RemoveContactStyle.buttonWrapper}>
            <TouchableOpacity
              style={{
                ...RemoveContactStyle.cancelBtn,
                backgroundColor:
                  selectedButton === "Cancel" ? "#FF7B7B" : "#353535",
              }}
              onPress={handleCancel}
            >
              <Text
                style={{
                  ...RemoveContactStyle.cancelBtnText,
                  color: selectedButton === "Cancel" ? "#222222" : "#C1C1C1",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...RemoveContactStyle.removeBtn,
                backgroundColor:
                  selectedButton === "Remove" ? "#FF7B7B" : "#353535",
              }}
              onPress={handleRemove}
            >
              <Text
                style={{
                  ...RemoveContactStyle.cancelBtnText,
                  color: selectedButton === "Remove" ? "#222222" : "#C1C1C1",
                }}
              >
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    bottom: 0,
  },
});

export default RemoveContact;
