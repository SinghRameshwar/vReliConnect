import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { realm } from "../../../../stores/DatabaseObj";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AddTagsStyle from "../../../style/homescreenStyle/homescreenComponentsStyle/AddTagsStyle";

const AddTags = ({ item, selectedTag, setselectedTag }) => {
  const [tags, settags] = useState("");
  const [onTagEdit, setonTagEdit] = useState("");
  const [tagEditEnable, settagEditEnable] = useState(false);
  const tagEditFRef = useRef(null);

  useEffect(() => {
    setselectedTag(item.event_tags);
  }, []);

  const refreshTagView = () => {
    const tasks = realm.objects("Profile");
    settags(tasks[0]?.defaultTags);
  };

  const handleTagClickDone = () => {
    let newTag;
    if (onTagEdit === "" || onTagEdit === undefined) {
      return;
    } else if (onTagEdit.charAt(0) === "#") {
      newTag = tags + " " + onTagEdit;
    } else {
      newTag = tags + " #" + onTagEdit;
    }
    realm.write(() => {
      realm.create(
        "Profile",
        {
          _id: "1",
          defaultTags: newTag,
        },
        true
      );
    });
    refreshTagView();
    Toast.show({ text1: "Successfully " + newTag + " Added..!" });
  };

  const deleteItemToRelme = (newTag) => {
    realm.write(() => {
      realm.create(
        "Profile",
        {
          _id: "1",
          defaultTags: newTag,
        },
        true
      );
    });
    refreshTagView();
    Toast.show({ text1: "Successfully deleted " + newTag + "..!" });
  };

  const deleteOnPress = (item) => {
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
            let result = tags
              .split(" ")
              .filter((item1) => item1 !== item)
              .join(" ");
            deleteItemToRelme(result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const modulePopupShow = (type, id = null) => {
    if (type === "message") {
      // Message View Navigation
      if (messageTitle.length > 3) {
        Toast.show({
          type: "error",
          text1: "You can save a maximum of 4 default messages!",
        });
        return;
      }
      navigation.navigate("ProfileViewMessageModal", {
        id: id,
        callBackMethod: messageEditUpdateCallBackMethod,
      });
    } else if (type === "tags") {
      if (tagEditEnable && onTagEdit !== "") {
        handleTagClickDone();
        setonTagEdit("");
      } else {
        settagEditEnable(!tagEditEnable);
        if (!tagEditEnable) {
          setTimeout(() => {
            tagEditFRef.current.focus();
          }, 100); // Add a timeout to ensure the element is mounted
        }
      }
    }
  };

  //Tag Selection Function
  const selectUnSelectTag = (tagName) => {
    if (selectedTag.includes(tagName)) {
      setselectedTag(selectedTag.filter((tagNam) => tagNam !== tagName));
    } else {
      setselectedTag([...selectedTag, tagName]);
    }
  };

  return (
    <View style={AddTagsStyle.addTagsContainer}>
      <Text style={AddTagsStyle.tagsHeading}>Tags</Text>
      {/* <TextInput
          //ref={tagEditFRef}
          style={{
            flex: 1,
            width: 200,
            borderWidth: 1,
            borderRadius: 15,
            margin: 10,
            padding: 10,
            //opacity: tagEditEnable ? 1 : 0,
            fontSize: 15,
            fontWeight: "bold",
            color: "#2b4d66",
            display: "none",
          }}
          multiline={false}
          onChangeText={(text) => setonTagEdit(text)}
          // value={onTagEdit}
          placeholder="Add new tags"
        /> */}
      {/* <TouchableOpacity
          style={{
            alignItems: "flex-end",
          }}
        >
          <Feather
            name={"edit-3"}
            color={"#C2C2C2"}
            size={22}
            onPress={() => modulePopupShow("tags")}
            style={{ marginRight: -10, padding: 14, marginRight: 4 }}
          />
        </TouchableOpacity> */}

      {/* <View> */}

      {/* <Text>
        {item?.event_tags?.split(" ").map((text, index) => {
          return (
            <TouchableOpacity
              onPress={() => selectUnSelectTag(text)}
              key={index}
            >
              <View style={AddTagsStyle.hashtag}>
                <Text
                  style={[
                    AddTagsStyle.hashtagContent,
                    {
                      color: selectedTag.includes(text) ? "grey" : "#E8E8E8",
                    },
                  ]}
                >
                  {text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })} */}
      <Text>
        {item?.event_tags?.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => deleteOnPress(item)}>
              <View style={AddTagsStyle.hashtag}>
                <Text style={AddTagsStyle.hashtagContent}>{item}</Text>
                <Entypo
                  name="cross"
                  size={18}
                  onPress={() => modulePopupShow("tags")}
                  style={AddTagsStyle.crossIcon}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </Text>
      <View style={{ position: "relative" }}>
        <TextInput
          ref={tagEditFRef}
          style={{
            flex: 1,
            backgroundColor: "#353535",
            borderRadius: 24,
            margin: 10,
            paddingVertical: 6,
            paddingHorizontal: 14,
            opacity: tagEditEnable ? 1 : 0,
            fontSize: 14,
            fontWeight: "400",
            color: "#E8E8E8",
            display: tagEditEnable ? "flex" : "none",
            paddingLeft: 20,
          }}
          multiline={false}
          onChangeText={(text) => setonTagEdit(text)}
          value={onTagEdit}
          placeholder="Add new tags"
          placeholderTextColor={"#E8E8E8"}
        />
        {onTagEdit ? (
          <TouchableOpacity
            onPress={() => setonTagEdit("")}
            style={{
              position: "absolute",
              right: 30,
              top: 18,
              zIndex: 1,
            }}
          >
            <Entypo name="cross" size={18} color="#E8E8E8" />
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity>
        <Ionicons
          name="add"
          color="#C4C4C4"
          size={26}
          onPress={() => modulePopupShow("tags")}
          style={AddTagsStyle.addIcon}
        />
      </TouchableOpacity>
      {/* </Text> */}
    </View>
  );
};

export default AddTags;
