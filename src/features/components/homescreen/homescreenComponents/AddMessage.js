import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { realm } from "../../../../stores/DatabaseObj";
import AddMessageStyle from "../../../style/homescreenStyle/homescreenComponentsStyle/AddMessageStyle";

const AddMessage = ({
  item,
  isEditMessage,
  setisEditMessage,
  currentMessage,
  setcurrentMessage,
}) => {
  const [messageCount, setMessageCount] = useState([]);
  const [msgIndxCount, setmsgIndxCount] = useState(0);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    if (item?.event_mess !== undefined) {
      if (item?.eventId === undefined) {
        setMessageCount(item.event_mess);
        setcurrentMessage(item.event_mess[0]);
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

  return (
    <View style={AddMessageStyle.messageContainer}>
      <Text style={AddMessageStyle.messageHeading}>Message </Text>
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
                marginTop: 10,
                borderRadius: 12,
                backgroundColor: "#353535",
                padding: 12,
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#515151",
                marginLeft: 2 + index,
                marginRight: 2 + index,
              }}
            >
              <Text
                // key={index}
                // defaultValue={item1}
                // multiline={true}
                style={AddMessageStyle.textMessage}
              >
                {item1}
              </Text>
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
            marginTop: 6,
          }}
        >
          {/* Indicator Dots */}
          {messageCount?.map((item, index) => {
            return (
              <View
                style={{
                  backgroundColor:
                    index === msgIndxCount ? "#C1C1C1" : "#4E4D4D",
                  width: index === msgIndxCount ? 24 : 12,
                  height: 6,
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

export default AddMessage;
