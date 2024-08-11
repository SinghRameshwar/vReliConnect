import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import RemoveEventStyle from "../../style/eventsStyle/RemoveEventStyle";
import DuplicateEventStyle from "../../style/eventsStyle/DuplicateEventStyle";

// Duplicate Button
const DuplicateEventButton = () => {
  return (
    <TouchableOpacity style={DuplicateEventStyle.duplicateBtnContainer}>
      <Text style={RemoveEventStyle.removeBtnText}>Duplicate</Text>
    </TouchableOpacity>
  );
};

const DuplicateEvent = ({ setDuplicateBottomSheetVisible }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => setDuplicateBottomSheetVisible(false)}
    >
      <SafeAreaView style={RemoveEventStyle.removeEventContainer}>
        <View style={RemoveEventStyle.removeEventContentContainer}>
          <Text style={RemoveEventStyle.removeEventTitle}>Duplicate Event</Text>
          <Text style={RemoveEventStyle.removeEventContent}>
            Duplicate event will only duplicate messages and tags. It will not
            duplicate your contacts.
          </Text>

          {/* Duplicate Button */}
          <DuplicateEventButton />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default DuplicateEvent;
