import { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { realm } from "../../../stores/DatabaseObj";
import AddMessageStyle from "../../style/homescreenStyle/homescreenComponentsStyle/AddMessageStyle";
import CopyEventNameStyle from "../../style/eventsStyle/CopyEventNameStyle";

const EventMessage = ({ messages, setmessages }) => {
  const [msgIndxCount, setmsgIndxCount] = useState(0);
  const [isEditMessage, setIsEditMessage] = useState(false);
  const { width } = Dimensions.get("window");
  const messageEditRef = useRef(null);

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
  };

  const onPressEditDonec = (item) => {
    if (isEditMessage === true) {
      messageDonePress(item);
    }
    setIsEditMessage(!isEditMessage);
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

  return (
    <View style={AddMessageStyle.messageContainer}>
      <Text style={CopyEventNameStyle.messageHeading}>Message</Text>
      <ScrollView
        nestedScrollEnabled={messages?.length > 1 ? true : false}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMessageScroll}
      >
        {/* Message - 1 */}
        {messages?.map((item1, index) => {
          return (
            <View
              style={{
                marginTop: 12,
                width: width - 40,
                borderRadius: 10,
                backgroundColor: "#353535",
                padding: 12,
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#515151",
                marginLeft: 2 + index,
                marginRight: 2 + index,
              }}
            >
              <TouchableOpacity onPress={() => setIsEditMessage(true)}>
                <TextInput
                  key={index}
                  ref={messageEditRef}
                  defaultValue={item1}
                  multiline={true}
                  editable={isEditMessage}
                  onChangeText={(text) => {
                    const newMessages = [...messages];
                    newMessages[msgIndxCount] = text;
                    setmessages(newMessages);
                  }}
                  style={CopyEventNameStyle.textMessage}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            marginLeft: 20,
            marginTop: 12,
          }}
        >
          {messages?.map((item, index) => {
            return (
              <View
                style={{
                  backgroundColor:
                    index === msgIndxCount ? "#C1C1C1" : "#4E4D4D",
                  width: index === msgIndxCount ? 20 : 8,
                  height: 8,
                  margin: 4,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={{
            marginLeft: "auto",
            marginVertical: 10,
            paddingRight: 10,
          }}
        ></TouchableOpacity>
      </View>
    </View>
  );
};

export default EventMessage;
