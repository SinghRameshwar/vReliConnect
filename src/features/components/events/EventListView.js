import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import EventListViewStyle from "../../style/eventsStyle/EventListViewStyle";
import { FlatList } from "react-native-gesture-handler";
import { SwipeListView } from "react-native-swipe-list-view";
import RemoveEvent from "./RemoveEvent";
import DuplicateEvent from "./DuplicateEvent";
import Toast from "react-native-toast-message";
import { selectEventForLive } from "../../../common/helperMethod/CommanMethods";

// General Network Container
const YourGeneralNetwork = ({ CopyDeleteEditActionPerform, generalEvent }) => {
  return (
    <View style={EventListViewStyle.generalNetworkContainer}>
      <TouchableOpacity
        onPress={() => CopyDeleteEditActionPerform("Live", generalEvent[0])}
      >
        <Text style={EventListViewStyle.generalNetworkTitle}>
          Your General Network
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => CopyDeleteEditActionPerform("Edit", generalEvent[0])}
        style={EventListViewStyle.editContainer}
      >
        <Text style={EventListViewStyle.editTitle}>Edit</Text>
        <AntDesign name="right" size={16} color="#747474" />
      </TouchableOpacity>
    </View>
  );
};

// Open Events Container
const OpenEvents = ({ CopyDeleteEditActionPerform, openEventList }) => {
  const renderEvents = ({ item, index }) => (
    <View style={EventListViewStyle.swipableEventsContainer}>
      <View style={EventListViewStyle.swipableEventDateTitleContainer}>
        <Text style={EventListViewStyle.eventTitle}>{item.name}</Text>
        <Text style={EventListViewStyle.dateTitle}>
          Start Date : {item.start_dt}
        </Text>
        <View style={{ opacity: item.status === "active" ? 1 : 0 }}>
          <Text style={{ color: "green", marginTop: 6 }}>Live Now</Text>
        </View>
      </View>
      <View style={EventListViewStyle.swipableEnterExitTitleContainer}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => CopyDeleteEditActionPerform("Live", item)}
        >
          <Text style={EventListViewStyle.enterTitle}>Enter</Text>
          <AntDesign
            name="arrowright"
            size={18}
            color="#747474"
            style={EventListViewStyle.arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => CopyDeleteEditActionPerform("Edit", item)}
        >
          <AntDesign
            name="profile"
            size={18}
            color="#747474"
            style={EventListViewStyle.file}
          />
        </TouchableOpacity>
        <View style={EventListViewStyle.eventBorderLine} />
        <TouchableOpacity
          onPress={() => CopyDeleteEditActionPerform("Copy", item)}
        >
          <Feather
            name="copy"
            size={18}
            color="#747474"
            style={EventListViewStyle.copy}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSeparator = () => <View style={{ width: 16 }} />;

  return (
    <View style={EventListViewStyle.openEventsContainer}>
      <Text style={EventListViewStyle.openEventsTitle}>Open Events</Text>
      <FlatList
        horizontal
        data={openEventList}
        renderItem={renderEvents}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

// Past Events Container
const PastEvents = ({ OpenRemoveEventView, closeEventList }) => {
  const renderItem = (data) => (
    <View style={EventListViewStyle.passEventListContainer}>
      <Text style={EventListViewStyle.pastEventTitle}>{data?.item?.name}</Text>
      <Text style={EventListViewStyle.pastEventDate}>
        End Date : {data?.item?.end_dt}
      </Text>
    </View>
  );

  const renderHiddenItem = (data) => (
    <View style={EventListViewStyle.rowBack}>
      <TouchableOpacity
        style={[
          EventListViewStyle.backRightBtn,
          EventListViewStyle.backRightBtnLeft,
        ]}
        onPress={() => OpenRemoveEventView("remove", data.item)}
      >
        <Feather name="trash-2" size={24} color="#6F6F6F" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          EventListViewStyle.backRightBtn,
          EventListViewStyle.backRightBtnRight,
        ]}
        onPress={() => OpenRemoveEventView("copy", data.item)}
      >
        <Feather name="copy" size={24} color="#6F6F6F" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={EventListViewStyle.pastEventsContainer}>
      <Text style={EventListViewStyle.pastEventsHeading}>Past Events</Text>
      <SwipeListView
        data={closeEventList}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        disableRightSwipe
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const EventListView = ({
  navigationCall,
  navigation,
  setisVisible,
  eventList,
  generalEvent,
  globalMethodCallWhenBackOnMainScreen,
}) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [duplicateBottomSheetVisible, setDuplicateBottomSheetVisible] =
    useState(false);
  const [openEventList, setopenEventList] = useState([]);
  const [closeEventList, setcloseEventList] = useState([]);

  const OpenEvent = () => {
    let openEvent1 = eventList.filtered(`eventType == "open"`);
    setopenEventList(openEvent1);
  };

  const CloseEvent = () => {
    let closeEvent1 = eventList.filtered(`eventType == "close"`);
    setcloseEventList(closeEvent1);
  };

  const dataSyncToDataBase = () => {
    OpenEvent();
    CloseEvent();
  };

  useEffect(() => {
    dataSyncToDataBase();
  }, [eventList]);

  useEffect(() => {
    if (!bottomSheetVisible) {
      setisVisible(false);
    }
  }, [bottomSheetVisible]);

  const OpenRemoveEventView = (type, data) => {
    ///............... pending Work
    if (type === "remove") {
      setBottomSheetVisible(true);
    } else if (type === "copy") {
      setDuplicateBottomSheetVisible(true);
    }
    setisVisible(true);
  };

  const CopyDeleteEditActionPerform = (type, data) => {
    if (type === "Copy") {
      navigationCall("Copy", data);
    } else if (type === "Edit") {
      navigationCall("Edit", data);
    } else if (type === "Live") {
      selectEventForLive(data);
      dataSyncToDataBase();
      setTimeout(() => globalMethodCallWhenBackOnMainScreen("event"), 800);
    }
  };

  return (
    <SafeAreaView style={EventListViewStyle.safeAreaView}>
      <ScrollView>
        <LinearGradient
          colors={["#151515", "#262626"]}
          style={EventListViewStyle.linearGradient}
        >
          <YourGeneralNetwork
            CopyDeleteEditActionPerform={CopyDeleteEditActionPerform}
            generalEvent={generalEvent}
          />

          <OpenEvents
            CopyDeleteEditActionPerform={CopyDeleteEditActionPerform}
            openEventList={openEventList}
          />
          <PastEvents
            OpenRemoveEventView={OpenRemoveEventView}
            closeEventList={closeEventList}
          />
          <View style={{ height: 200 }}></View>
        </LinearGradient>
      </ScrollView>

      {bottomSheetVisible && (
        <RemoveEvent setBottomSheetVisible={setBottomSheetVisible} />
      )}
      {duplicateBottomSheetVisible && (
        <DuplicateEvent
          setDuplicateBottomSheetVisible={setDuplicateBottomSheetVisible}
        />
      )}
      <Toast />
    </SafeAreaView>
  );
};

export default EventListView;
