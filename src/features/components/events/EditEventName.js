import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import TitleHeadingStyle from "../../../common/style/TitleHeadingStyle";
import CopyEventNameStyle from "../../style/eventsStyle/CopyEventNameStyle";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EditEventNameStyle from "../../style/eventsStyle/EditEventNameStyle";
import EventMessage from "./EventMessage";
import { realm } from "../../../stores/DatabaseObj";
import AddTags from "../homescreen/homescreenComponents/AddTags";
import { ScrollView } from "react-native-gesture-handler";
import EventTags from "./EventTags";

// HeadingContent
const EventHeading = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#4B3A33", "#262626"]}
      style={TitleHeadingStyle.editProfileHeadingContainer}
    >
      <View style={CopyEventNameStyle.headerElementsWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="keyboard-backspace"
            size={28}
            style={CopyEventNameStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={CopyEventNameStyle.eventHeading}>My Network</Text>
        <Text style={CopyEventNameStyle.save}>Save</Text>
      </View>
    </LinearGradient>
  );
};

// Event Name
const EventName = () => {
  return (
    <View style={EditEventNameStyle.eventNameContainer}>
      <Text style={EditEventNameStyle.eventNameTitle}>Event Name</Text>
      <TextInput
        multiline={false}
        placeholder="Grow Your Network"
        placeholderTextColor={"#C1C1C1"}
        style={EditEventNameStyle.eventNameTextInput}
      />
    </View>
  );
};

const EditEventName = ({ navigation }) => {
  const [currentView, setcurrentView] = useState({});
  const [isEditMessage, setisEditMessage] = useState(false);
  const [currentMessage, setcurrentMessage] = useState("");
  const [selectedTag, setselectedTag] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  // Seleted Event Filter
  const refreshData = () => {
    const events = realm.objects("Event");
    const activeEvents = events.filtered('status == "active"');
    setcurrentView(activeEvents[0]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*  Heading Content*/}
      <EventHeading navigation={navigation} />
      <ScrollView>
        <LinearGradient colors={["#151515", "#262626"]} style={{ flex: 1 }}>
          {/* Event Name Container */}
          <EventName />

          {/* Message Wrapper */}
          <EventMessage
            item={currentView}
            isEditMessage={isEditMessage}
            setisEditMessage={setisEditMessage}
            currentMessage={currentMessage}
            setcurrentMessage={setcurrentMessage}
          />

          {/* Add Tags Wrapper */}
          <EventTags
            item={currentView}
            selectedTag={selectedTag}
            setselectedTag={setselectedTag}
          />
          <View style={{ height: 100 }}></View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditEventName;
