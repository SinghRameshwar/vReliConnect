import React, { useEffect, useState } from "react";
import { Text, Image, View, ScrollView, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultEventsStyle from "../../style/eventsStyle/DefaultEventsStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import TitleHeading from "../../../common/components/TitleHeading";
import EventListView from "./EventListView";
import { realm } from "../../../stores/DatabaseObj";

// Display default Img
const DisplayDefaultImage = () => {
  return (
    <View style={DefaultEventsStyle.bgImgEventContainer}>
      <Image
        source={require("../../../assets/images/EventBgImg.png")}
        style={DefaultEventsStyle.eventBgImg}
      />
      <Image
        source={require("../../../assets/images/eventImg.png")}
        style={DefaultEventsStyle.eventImg}
      />
    </View>
  );
};

// Display Card Container
const DisplayMyNetworkCard = ({ navigationCall, generalEvent }) => {
  return (
    <View style={DefaultEventsStyle.cardContainer}>
      {/* Upper Card Content */}
      <LinearGradient
        colors={["#ffb29e", "#ffdfd6"]}
        style={DefaultEventsStyle.upperCardDetailContainer}
      >
        {/* calendar & edit icon Container */}
        <View style={DefaultEventsStyle.calendarAndEditIconContainer}>
          <LinearGradient
            colors={["#FF8866", "#FE3403"]}
            style={DefaultEventsStyle.calendarIconContainer}
          >
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={30}
              style={DefaultEventsStyle.calendarIcon}
            />
          </LinearGradient>
          <TouchableOpacity
            onPress={() => navigationCall("Edit", generalEvent[0])}
          >
            <LinearGradient
              colors={["#fec9bb", "#fff0ec"]}
              style={DefaultEventsStyle.editIconContainer}
            >
              <Feather
                name="edit-3"
                size={16}
                style={DefaultEventsStyle.editIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Title & copy event icon  */}
        <View style={DefaultEventsStyle.titleAndCopyEventContainer}>
          <Text style={DefaultEventsStyle.eventTitle}>
            {generalEvent[0]?.name}
          </Text>
          <TouchableOpacity
            onPress={() => navigationCall("Copy", generalEvent[0])}
          >
            <LinearGradient
              colors={["#ffcfca", "#fff3f3"]}
              style={DefaultEventsStyle.copyIconContainer}
            >
              <Ionicons
                name="copy-outline"
                size={16}
                style={DefaultEventsStyle.copyIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Lower Card Content */}
      <LinearGradient
        colors={["#FF8866", "#FF3838", "#FE3403"]}
        style={DefaultEventsStyle.lowerCardDetailContainer}
      >
        <Text style={DefaultEventsStyle.titelContent}>General Networking</Text>
        <Text style={[DefaultEventsStyle.titelContent, { marginTop: 16 }]}>
          Open Forever
        </Text>
      </LinearGradient>
    </View>
  );
};

const DefaultEvents = ({
  navigation,
  setisVisible,
  globalMethodCallWhenBackOnMainScreen,
}) => {
  const [eventList, seteventList] = useState([]);
  const [generalEvent, setGeneralEvent] = useState([]);

  // Refresh Event List
  const refreshEventList = () => {
    const events = realm.objects("Event");
    seteventList(events);
    GeneralEvent(events);
  };

  const GeneralEvent = (events) => {
    let generalEvent = events.filtered(`eventType == "general"`);
    setGeneralEvent(generalEvent);
  };

  useEffect(() => {
    refreshEventList();
  }, []);

  const navigationCall = (type, data) => {
    navigation.navigate("CopyEventName", {
      type: type,
      callBackFunc: refreshEventList,
      data: data,
    });
  };

  return (
    <SafeAreaView style={DefaultEventsStyle.DefaultEventsContainer}>
      {/* Event Header */}
      <TitleHeading titleHeading="Events" />

      {/* Content Wrapper */}
      <View style={DefaultEventsStyle.contentWrapper}>
        {eventList.length > 1 && (
          <EventListView
            navigationCall={navigationCall}
            navigation={navigation}
            setisVisible={setisVisible}
            eventList={eventList}
            generalEvent={generalEvent}
            globalMethodCallWhenBackOnMainScreen={
              globalMethodCallWhenBackOnMainScreen
            }
          />
        )}
        {eventList.length === 1 && (
          <View>
            <DisplayDefaultImage />
            <DisplayMyNetworkCard
              navigationCall={navigationCall}
              generalEvent={generalEvent}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DefaultEvents;
