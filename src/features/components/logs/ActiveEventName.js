import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleHeading from "../../../common/components/TitleHeading";
import ActiveEventNameStyle from "../../style/logsStyle/ActiveEventNameStyle";
import LinearGradient from "react-native-linear-gradient";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import RemoveContact from "./RemoveContact";
import { realm } from "../../../stores/DatabaseObj";
import {
  deleteEventById,
  shareDetails,
} from "../../../common/helperMethod/CommanMethods";

const ToggleButtonContainer = ({
  activeToggleButton,
  setActiveToggleButton,
}) => {
  return (
    <View style={ActiveEventNameStyle.toggleBtnWrapper}>
      <TouchableOpacity
        style={{
          ...ActiveEventNameStyle.btnContentWrapper,
          backgroundColor: activeToggleButton === 1 ? "#84FFB5" : "#262626",
        }}
        onPress={() => setActiveToggleButton(1)}
      >
        <Text
          style={{
            ...ActiveEventNameStyle.btnContent,
            color: activeToggleButton === 1 ? "#1C1C1C" : "#747474",
          }}
        >
          Recent
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...ActiveEventNameStyle.btnContentWrapper,
          backgroundColor: activeToggleButton === 2 ? "#84FFB5" : "#262626",
        }}
        onPress={() => setActiveToggleButton(2)}
      >
        <Text
          style={{
            ...ActiveEventNameStyle.btnContent,
            color: activeToggleButton === 2 ? "#1C1C1C" : "#747474",
          }}
        >
          Active Event Name
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...ActiveEventNameStyle.btnContentWrapper,
          backgroundColor: activeToggleButton === 3 ? "#84FFB5" : "#262626",
        }}
        onPress={() => setActiveToggleButton(3)}
      >
        <Text
          style={{
            ...ActiveEventNameStyle.btnContent,
            color: activeToggleButton === 3 ? "#1C1C1C" : "#747474",
          }}
        >
          General
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const EventNameList = ({ items, setItems, onDeletePress }) => {
  // Function to render right actions (delete, edit, share)
  const renderRightActions = (item) => (progress, dragX) => {
    return (
      <View style={ActiveEventNameStyle.rightActionContainer}>
        <TouchableOpacity
          style={ActiveEventNameStyle.deleteActionButton}
          onPress={() => onDeletePress("delete", item)}
        >
          <AntDesign name="delete" size={22} color={"#6F6F6F"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDeletePress("edit", item)}
          style={ActiveEventNameStyle.deleteActionButton}
        >
          <AntDesign name="edit" size={22} color={"#6F6F6F"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={ActiveEventNameStyle.actionButton}
          onPress={() => onDeletePress("share", item)}
        >
          <Entypo name="share" size={22} color={"#6F6F6F"} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      {items.map((item) => (
        <Swipeable key={item.id} renderRightActions={renderRightActions(item)}>
          <View style={ActiveEventNameStyle.eventNameListContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Image
                  source={require("../../../assets/images/user_img.png")}
                  style={ActiveEventNameStyle.displayImg}
                />
                <Text style={ActiveEventNameStyle.displayName}>
                  {item.meet_name}
                </Text>
              </View>
              <View
                style={[
                  ActiveEventNameStyle.activeDotContainer,
                  { backgroundColor: item.isActive ? "#95E2B6" : "#DD5F41" },
                ]}
              >
                {item.isActive ? (
                  <Entypo
                    name="check"
                    size={12}
                    color={"#168244"}
                    style={ActiveEventNameStyle.check}
                  />
                ) : (
                  <Ionicons
                    name="remove-outline"
                    size={20}
                    color={"#882109"}
                    style={ActiveEventNameStyle.stop}
                  />
                )}
              </View>
            </View>
          </View>
        </Swipeable>
      ))}
    </ScrollView>
  );
};

const ActiveEventName = ({ setisVisible, setselectTabBtn }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [activeToggleButton, setActiveToggleButton] = useState(2);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [items, setItems] = useState([]);

  const refreshViewwithData = () => {
    if (activeToggleButton === 1) {
      recent_EventData();
    } else if (activeToggleButton === 2) {
      active_EventData();
    } else if (activeToggleButton === 3) {
      general_EventData();
    }
  };

  useEffect(() => {
    refreshViewwithData();
  }, [activeToggleButton]);

  const active_EventData = () => {
    const events = realm.objects("Event");
    const activeEvents = events.filtered('status == "active"');
    if (activeEvents.length >= 1) {
      const eventGroups = realm.objects("Eventgroup");
      const active_eventgroup = eventGroups.filtered(
        `eventId == "${activeEvents[0].id}"`
      );
      setItems(active_eventgroup);
    }
  };

  const general_EventData = () => {
    const events = realm.objects("Event");
    const activeEvents = events.filtered('eventType == "general"');
    if (activeEvents.length >= 1) {
      const eventGroups = realm.objects("Eventgroup");
      const active_eventgroup = eventGroups.filtered(
        `eventId == "${activeEvents[0].id}"`
      );
      setItems(active_eventgroup);
    }
  };

  const recent_EventData = () => {
    const events = realm.objects("Event");
    const activeEvents = events.filtered('status == ""');
    if (activeEvents.length >= 1) {
      const eventGroups = realm.objects("Eventgroup");
      const active_eventgroup = eventGroups.filtered(
        `eventId == "${activeEvents[0].id}"`
      );
      setItems(active_eventgroup);
    }
  };

  const handleDeletePress = (types, item) => {
    if (types === "delete") {
      setItemToDelete(item);
      setBottomSheetVisible(true);
    } else if (types === "edit") {
      setselectTabBtn(3);
    } else if (types === "share") {
      shareDetails(item);
    }
  };

  useEffect(() => {
    if (bottomSheetVisible) {
      setisVisible(true);
    } else {
      setisVisible(false);
    }
  }, [bottomSheetVisible]);

  const deleteItem = () => {
    deleteEventById(itemToDelete.id);
    setBottomSheetVisible(false);
    refreshViewwithData();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TitleHeading titleHeading={"Contacts"} />
        <LinearGradient colors={["#151515", "#262626"]}>
          <ToggleButtonContainer
            activeToggleButton={activeToggleButton}
            setActiveToggleButton={setActiveToggleButton}
          />
          <EventNameList
            items={items}
            setItems={setItems}
            onDeletePress={handleDeletePress}
            // setselectTabBtn={setselectTabBtn}
          />
        </LinearGradient>
        {bottomSheetVisible && (
          <RemoveContact
            setBottomSheetVisible={setBottomSheetVisible}
            deleteItem={deleteItem}
          />
        )}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ActiveEventName;
