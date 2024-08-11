import React, { Alert } from "react-native";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { realm } from "../stores/DatabaseObj";
import { newEvent } from "./constants/eventData";
import EditEventTemplateStyle from "../style/EditEventTemplateStyle";
import { format } from "date-fns";
import LinearGradient from "react-native-linear-gradient";
import QrImageStyle from "../style/QrImageStyle";
import ProfileTemplateStyle from "../style/ProfileTemplateStyle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import UserProfileInfoStyle from "../style/UserProfileInfoStyle";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditEventTemplate = ({ route, navigation }) => {
  const [isEditMessage, setisEditMessage] = useState(false);
  const [isPartyEdit, setisPartyEdit] = useState(false);
  const [currentView, setcurrentView] = useState({});
  const [messageCount, setMessageCount] = useState([]);
  const [msgIndxCount, setmsgIndxCount] = useState(0);
  const [selectedTag, setselectedTag] = useState([]);
  const [currentMessage, setcurrentMessage] = useState("");
  const { width } = Dimensions.get("window");
  const messageEditRef = useRef(null);
  const item = route.params.item;

  const goBackMethodCall = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log(route.params.item.start_dt);
    if (item?.event_mess !== undefined) {
      if (item?.eventId === undefined) {
        const profile1 = realm.objects("Profile");
        setMessageCount(profile1[0].message);
        setcurrentMessage(profile1[0]?.message[0]);
      } else {
        setMessageCount([item.event_mess]);
        setcurrentMessage(item.event_mess);
      }
    }
  }, [item]);

  // Message Scroll View
  const handleMessageScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    let index;
    if (offsetX <= 0) {
      index = 0;
    } else {
      index = Math.floor(offsetX / width) + 1;
    }
    setmsgIndxCount(index);
    setcurrentMessage(messageCount[index]);
  };

  const onPressEditDonec = (item) => {
    if (isEditMessage === true) {
      messageDonePress(item);
    }
    setisEditMessage(!isEditMessage);
  };

  // Call When Client Message press Done
  const messageDonePress = (indexKey) => {
    let tableNam;
    let createdObj = {};
    if (indexKey?.eventId === undefined) {
      tableNam = "Event";
      createdObj = {
        id: indexKey.id,
        event_mess: currentMessage,
      };
    } else {
      tableNam = "Eventgroup";
      createdObj = {
        id: indexKey.id,
        event_mess: currentMessage,
      };
    }
    realm.write(() => {
      realm.create(tableNam, createdObj, true);
    });
  };

  const selectUnSelectTag = (tagName) => {
    if (selectedTag.includes(tagName)) {
      setselectedTag(selectedTag.filter((tagNam) => tagNam !== tagName));
    } else {
      setselectedTag([...selectedTag, tagName]);
    }
  };

  return (
    <SafeAreaView style={EditEventTemplateStyle.newEventTemplateContainer}>
      {/* Edit Events Heading Container */}
      <LinearGradient
        colors={["#262626", "#4B3A33"]}
        style={QrImageStyle.qrCodeHeadingContainer}
      >
        <TouchableOpacity
          style={{
            paddingLeft: 14,
            paddingTop: 36,
          }}
          onPress={() => goBackMethodCall()}
        >
          <MaterialIcons
            name="keyboard-backspace"
            size={26}
            style={ProfileTemplateStyle.backIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={QrImageStyle.qrCodeHeading}>Edit Events</Text>
          <Text>{item.start_dt}</Text>
        </View>
      </LinearGradient>

      <ScrollView>
        {/* Start Date Container */}
        {/* <View style={EditEventTemplateStyle.startDateContainer}>
          <AntDesign
            name="calendar"
            size={26}
            style={EditEventTemplateStyle.calendarIcon}
          />
          <Text style={EditEventTemplateStyle.startDateText}>
            Start Date: 2024/05/31
          </Text>
        </View> */}

        {/* Enter Name Container*/}
        <View style={EditEventTemplateStyle.newEventInputContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={EditEventTemplateStyle.eventNameHeading}>
              Event Name
            </Text>
            <Feather
              name={!isPartyEdit ? "edit-3" : "check"}
              color={!isPartyEdit ? "#C2C2C2" : "#C2C2C2"}
              size={22}
              onPress={() => onPressEditDonec(item)}
              style={EditEventTemplateStyle.editIcon}
            />
          </View>

          <TextInput
            placeholder="Event 1"
            maxLength={40}
            multiline={false}
            placeholderTextColor="#C1C1C1"
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              fontSize: 14,
              lineHeight: 16,
              fontWeight: "600",
              color: "#E8E8E8",
              borderRadius: 5,
              backgroundColor: "#353535",
            }}
          />
        </View>

        {/* Message Container */}
        <View style={ProfileTemplateStyle.messageContainer}>
          <View style={EditEventTemplateStyle.hashtagsHeadingContainer}>
            <Text style={ProfileTemplateStyle.messageHeading}>Messages </Text>
            <Feather
              name={!isEditMessage ? "edit-3" : "check"}
              color={!isEditMessage ? "#C2C2C2" : "#C2C2C2"}
              size={22}
              onPress={() => onPressEditDonec(item)}
              style={EditEventTemplateStyle.hashtagEditIcon}
            />
          </View>

          <ScrollView
            nestedScrollEnabled={messageCount?.length > 1 ? true : false}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMessageScroll}
          >
            {/* Message - 1 */}
            {messageCount?.map((item1, index) => {
              return (
                <View
                  style={{
                    width: width - 40,
                    borderRadius: 10,
                    backgroundColor: "#353535",
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    marginLeft: 2 + index,
                    marginRight: 2 + index,
                  }}
                >
                  <TextInput
                    key={index}
                    ref={messageEditRef}
                    defaultValue={item1}
                    multiline={true}
                    editable={isEditMessage}
                    onChangeText={(text) => setcurrentMessage(text)}
                    style={EditEventTemplateStyle.textMessage}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Tags Container */}
        <View style={EditEventTemplateStyle.displayHashtagsWrapper}>
          <View style={EditEventTemplateStyle.hashtagsHeadingContainer}>
            <Text style={EditEventTemplateStyle.tagsHeading}>Tags</Text>
            {/* <TextInput */}
            {/* ref={tagEditFRef} */}
            {/* style={{
              flex: 1,
              width: 200,
              borderWidth: 1,
              borderRadius: 15,
              margin: 10,
              padding: 10,
              fontSize: 15,
              fontWeight: "bold",
              color: "#2b4d66",
              display: "none",
            }}
            multiline={false}
            onChangeText={(text) => setonTagEdit(text)}
            // value={onTagEdit} 
            placeholder="Add new tags"
          />*/}
            <TouchableOpacity>
              <Feather
                name={"edit-3"}
                color={"#C2C2C2"}
                size={22}
                onPress={() => modulePopupShow("tags")}
                style={EditEventTemplateStyle.hashtagEditIcon}
              />
            </TouchableOpacity>
          </View>

          <Text>
            {item?.event_tags?.map((text, index) => {
              return (
                <TouchableOpacity
                  onPress={() => selectUnSelectTag(text)}
                  key={index}
                >
                  <View style={ProfileTemplateStyle.hashtag}>
                    <Text
                      style={{
                        color: selectedTag.includes(text) ? "grey" : "#E8E8E8",
                        lineHeight: 16,
                        fontWeight: "400",
                        fontFamily: "Reddit Sans",
                        fontSize: 14,
                      }}
                    >
                      {text}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Text>
        </View>

        {/* Button Container */}
        <View>
          <TouchableOpacity style={UserProfileInfoStyle.updateBtnContainer}>
            <Text style={UserProfileInfoStyle.updateBtnText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={EditEventTemplateStyle.closeEventBtnContainer}
            onPress={goBackMethodCall}
          >
            <Text style={EditEventTemplateStyle.closeEventBtnText}>
              Close Event
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditEventTemplate;
