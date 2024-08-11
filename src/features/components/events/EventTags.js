import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AddTagsStyle from "../../../features/style/homescreenStyle/homescreenComponentsStyle/AddTagsStyle";
import CopyEventNameStyle from "../../style/eventsStyle/CopyEventNameStyle";

const EventTags = ({ selectedTag, setselectedTag }) => {
  const tagEditFRef = useRef(null);
  const [onTagEdit, setonTagEdit] = useState("");
  const [isEditMode, setisEditMode] = useState(false);

  const deleteOnPress = (item, index) => {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete " + item + "?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setselectedTag(selectedTag.filter((item1) => item1 !== item));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const modulePopupShow = (type) => {
    if (type === "Delete") {
    } else if (type === "Add") {
      if (onTagEdit !== "") {
        setselectedTag([...selectedTag, onTagEdit]);
        setonTagEdit("");
      }
    }
  };

  return (
    <View style={AddTagsStyle.addTagsContainer}>
      <Text style={CopyEventNameStyle.tagsHeading}>Tags</Text>
      <Text style={{ textAlign: "left" }}>
        {selectedTag?.map((item, index) => {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                key={index}
                onPress={() => deleteOnPress(item, index)}
              >
                <View style={AddTagsStyle.hashtag}>
                  <Text style={AddTagsStyle.hashtagContent}>{item}</Text>
                  <Entypo
                    name="cross"
                    size={18}
                    style={CopyEventNameStyle.crossIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() => setisEditMode(!isEditMode)}
          style={CopyEventNameStyle.addIcon}
        >
          <Ionicons
            name={!isEditMode ? "add" : "remove"}
            color="#C4C4C4"
            size={20}
          />
        </TouchableOpacity>
      </Text>
      <View
        style={{ position: "relative", display: !isEditMode ? "none" : "flex" }}
      >
        <TextInput
          ref={tagEditFRef}
          style={{
            flex: 1,
            backgroundColor: "#353535",
            borderRadius: 24,
            margin: 10,
            paddingVertical: 6,
            paddingHorizontal: 14,
            fontSize: 13,
            fontWeight: "600",
            color: "#E8E8E8",
          }}
          multiline={false}
          onChangeText={(text) => setonTagEdit(text)}
          value={onTagEdit}
          placeholder="Add new tags"
          placeholderTextColor={"#E8E8E8"}
        />

        <TouchableOpacity
          onPress={() => modulePopupShow("Add")}
          style={{
            position: "absolute",
            right: 20,
            top: 12,
            zIndex: 1,
          }}
        >
          <Text style={{ padding: 5, color: "white" }}>Done</Text>
        </TouchableOpacity>
      </View>
      {/* </Text> */}
    </View>
  );
};

export default EventTags;
