import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import TitleHeadingStyle from "../../../common/style/TitleHeadingStyle";
import CopyEventNameStyle from "../../style/eventsStyle/CopyEventNameStyle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import EventMessage from "./EventMessage";
import EditEventNameStyle from "../../style/eventsStyle/EditEventNameStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { realm } from "../../../stores/DatabaseObj";
import { ScrollView } from "react-native-gesture-handler";
import EventTags from "./EventTags";
import { newEvent } from "../../../templateScreens/constants/eventData";
import { format } from "date-fns";
import CloseEvent from "./CloseEvent";
// import CloseEvent from "./CloseEvent";

const CopyEventHeading = ({ actionPerform, actionType, headerTitle }) => {
  return (
    <LinearGradient
      colors={["#4B3A33", "#262626"]}
      style={TitleHeadingStyle.editProfileHeadingContainer}
    >
      <View style={CopyEventNameStyle.headerElementsWrapper}>
        <TouchableOpacity onPress={() => actionPerform("goBack")}>
          <MaterialIcons
            name="keyboard-backspace"
            size={28}
            style={CopyEventNameStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={CopyEventNameStyle.eventHeading}>{headerTitle}</Text>
        <TouchableOpacity onPress={() => actionPerform("confirm")}>
          <Text style={CopyEventNameStyle.save}>{actionType}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// Event Name
const EventName = ({ eventName, setEventName }) => {
  return (
    <View style={EditEventNameStyle.eventNameContainer}>
      <Text style={EditEventNameStyle.eventNameTitle}>Event Name</Text>
      {/* Render TextInput when user clicks on edit */}
      <TextInput
        multiline={false}
        placeholder="Event 1"
        placeholderTextColor={"#C1C1C1"}
        defaultValue={eventName}
        onChangeText={(text) => setEventName(text)}
        style={EditEventNameStyle.eventNameTextInput}
      />
    </View>
  );
};

// Display Calendar Icon & Date
const StartDate = ({ eventDate, setEventDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShow(Platform.OS === "ios");
    setEventDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={CopyEventNameStyle.displayStartDateContainer}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={showDatepicker}
      >
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={28}
          color="#84FFB5"
        />
        <Text style={CopyEventNameStyle.startDateTitle}>
          Start Date : {eventDate.toISOString().split("T")[0]}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={eventDate}
          mode="date"
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

// Display Optional Close Event Btn for openEvent Screen
const CloseEventBtn = ({ setcloseEventConfirmation }) => {
  return (
    <TouchableOpacity
      style={CopyEventNameStyle.closeEventContainer}
      onPress={() => setcloseEventConfirmation(true)}
    >
      <Text style={CopyEventNameStyle.closeEventText}>Close Event</Text>
    </TouchableOpacity>
  );
};

const CopyEventName = ({ route, navigation }) => {
  const callBackFunc = route.params.callBackFunc;
  const [currentView, setcurrentView] = useState({});
  const [messages, setmessages] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [actionType, setActionType] = useState("Save");
  const [eventName, setEventName] = useState("");
  const [iscloseEventBtn, setIsCloseEventBtn] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  const [closeEventConfirmation, setcloseEventConfirmation] = useState(false);
  const rootType = route.params.type;
  const dataObj = route.params.data;

  useEffect(() => {
    if (rootType === "Edit") {
      setActionType("Save");
    } else if (rootType === "Copy") {
      setActionType("Save");
    }
    setEventName(dataObj?.name);
    setcurrentView(dataObj);
    setSelectedTag(dataObj?.event_tags);
    setmessages(dataObj?.event_mess);
    closeEventTag();
  }, []);

  const closeEventTag = () => {
    if (rootType === "Edit" && dataObj.eventType !== "general") {
      setIsCloseEventBtn(true);
    } else {
      setIsCloseEventBtn(false);
    }
  };

  const actionPerform = (type) => {
    if (type === "goBack") {
      navigation.goBack();
    } else if (type === "confirm") {
      if (rootType === "Copy") {
        copyEventMethod();
      } else if (rootType === "Edit") {
        editEventMethod();
      }
    }
  };

  const editEventMethod = () => {
    let newEventCreate = {
      ...newEvent,
      name: eventName,
      event_mess: [...messages],
      event_tags: [...selectedTag],
      start_dt: format(eventDate, "yyyy-MM-dd"),
      id: dataObj.id,
      eventType: dataObj.eventType,
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

  const copyEventMethod = () => {
    let newEventCreate = {
      ...newEvent,
      name: eventName,
      event_mess: [...messages],
      event_tags: [...selectedTag],
      start_dt: format(eventDate, "yyyy-MM-dd"),
      status: "",
      id: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      eventType: "open",
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
    <SafeAreaView style={{ flex: 1 }}>
      <CopyEventHeading
        actionPerform={actionPerform}
        actionType={actionType}
        headerTitle={dataObj?.name}
      />
      <ScrollView>
        <LinearGradient colors={["#151515", "#262626"]} style={{ flex: 1 }}>
          {/* Display Start Date */}
          <StartDate eventDate={eventDate} setEventDate={setEventDate} />
          {/* Event Name Container */}
          <EventName eventName={eventName} setEventName={setEventName} />

          {/* Message Wrapper */}
          <EventMessage messages={messages} setmessages={setmessages} />

          {/* Add Tags Wrapper */}
          <EventTags
            selectedTag={selectedTag}
            setselectedTag={setSelectedTag}
          />

          {/* Close Button */}

          {iscloseEventBtn && (
            <CloseEventBtn
              setcloseEventConfirmation={setcloseEventConfirmation}
            />
          )}

          <View style={{ height: 100 }}></View>
        </LinearGradient>
      </ScrollView>

      {/* Conditional Rendering of Close Event Bottomsheet */}
      {closeEventConfirmation && (
        <CloseEvent
          setcloseEventConfirmation={setcloseEventConfirmation}
          data={currentView}
          callBackFunc={callBackFunc}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

export default CopyEventName;
