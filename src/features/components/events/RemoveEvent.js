import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import RemoveEventStyle from "../../style/eventsStyle/RemoveEventStyle";
import Toast from "react-native-toast-message";

// Registered Email Container
const RegisteredEmailInput = ({ email, setEmail }) => {
  return (
    <View>
      <TextInput
        placeholder="Enter your registered email to confirm"
        placeholderTextColor={"#C1C1C1"}
        style={RemoveEventStyle.emailInput}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
    </View>
  );
};

// Remove Button
const RemoveEventButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={RemoveEventStyle.removeBtnContainer}
      onPress={onPress}
    >
      <Text style={RemoveEventStyle.removeBtnText}>Remove</Text>
    </TouchableOpacity>
  );
};

const RemoveEvent = ({ setBottomSheetVisible }) => {
  const [email, setEmail] = useState("");

  const handleRemove = () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter email address",
        visibilityTime: 3000, // 3 seconds
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid email address",
        visibilityTime: 3000, // 3 seconds
      });
      return;
    }

    // Proceed with the removal process
  };

  return (
    <TouchableWithoutFeedback onPress={() => setBottomSheetVisible(false)}>
      <SafeAreaView style={RemoveEventStyle.removeEventContainer}>
        <View style={RemoveEventStyle.removeEventContentContainer}>
          <Text style={RemoveEventStyle.removeEventTitle}>Remove Event</Text>
          <Text style={RemoveEventStyle.removeEventContent}>
            Removing event can’t be undone. We will only remove the event from
            the list but contacts won’t be removed from your device/storage.
          </Text>

          {/* Registered Email */}
          <RegisteredEmailInput email={email} setEmail={setEmail} />

          {/* Remove Button */}
          <RemoveEventButton onPress={handleRemove} />
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RemoveEvent;
