import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RemoveContactStyle from "../../style/logsStyle/RemoveContactStyle";
import CloseEventStyle from "../../style/eventsStyle/CloseEventStyle";
import Toast from "react-native-toast-message";
import { realm } from "../../../stores/DatabaseObj";
import { format } from "date-fns";

const CloseEvent = ({
  setcloseEventConfirmation,
  data,
  callBackFunc,
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [selectedButton, setSelectedButton] = useState("Remove");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const handleCancel = () => {
    setSelectedButton("Cancel");
    setTimeout(() => {
      setcloseEventConfirmation(false);
    }, 100);
  };

  const handleRemove = () => {
    if (!email) {
      showToast("error", "Error", "Please enter your email address");
      return;
    } else if (!validateEmail(email)) {
      showToast("error", "Invalid Email", "Please enter a valid email address");
      return;
    } else {
      setSelectedButton("Remove");
      showToast("success", "Success", "The event is closed");
      editEventMethod();
    }
  };

  const editEventMethod = () => {
    let newEventCreate = {
      ...data,
      eventType: "close",
      end_dt: format(new Date(), "yyyy-MM-dd"),
    };
    try {
      realm.write(() => {
        realm.create("Event", newEventCreate, true);
      });
      callBackFunc();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setcloseEventConfirmation(false)}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={RemoveContactStyle.removeContactContainer}>
          <Text style={RemoveContactStyle.title}>Close Event</Text>
          <TextInput
            placeholder="Enter your registered email to confirm"
            placeholderTextColor={"#C1C1C1"}
            keyboardType="email-address"
            style={CloseEventStyle.emailInputField}
            value={email}
            onChangeText={setEmail}
          />
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
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    flex: 1,
    bottom: 0,
  },
});

export default CloseEvent;
