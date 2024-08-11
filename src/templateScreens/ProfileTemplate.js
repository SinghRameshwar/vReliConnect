import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import { realm } from "../stores/DatabaseObj";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import ProfileTemplateStyle from "../style/ProfileTemplateStyle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";

const ProfileTemplate = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [messageTitle, setmessageTitle] = useState([]);
  const [message, setmessage] = useState([]);
  const [tags, settags] = useState("");
  const profileDataObj = useRef({});
  const { width } = Dimensions.get("window");
  const [onTagEdit, setonTagEdit] = useState("");
  const [tagEditEnable, settagEditEnable] = useState(false);
  const tagEditFRef = useRef(null);
  const [msgIndxCount, setmsgIndxCount] = useState(0);

  const refreshView = () => {
    const tasks = realm.objects("Profile");
    profileDataObj.current = tasks[0];
    setImage(tasks[0]?.profle_image);
    setName(tasks[0]?.name);
    setphone(tasks[0]?.usermob);
    setemail(tasks[0]?.useremail);
    settags(tasks[0]?.defaultTags);
    setmessageTitle(tasks[0]?.mess_title);
    setmessage(tasks[0]?.message);
  };

  const refreshTagView = () => {
    const tasks = realm.objects("Profile");
    settags(tasks[0]?.defaultTags);
  };

  useEffect(() => {
    refreshView();
  }, []);

  const goBackMethodCall = () => {
    navigation.goBack();
  };

  const profileInfoNavigation = () => {
    navigation.navigate("UserProfileInfo", {
      callBackMethod: messageEditUpdateCallBackMethod,
    });
  };

  const qrImageNavigation = () => {
    navigation.navigate("QRimage", {
      callBackMethod: messageEditUpdateCallBackMethod,
    });
  };

  const messageEditUpdateCallBackMethod = () => {
    refreshView();
  };

  // const modulePopupShow = (type, id = null) => {
  //   if (type === "message") {
  //     // Messave View Navigation
  //     if (messageTitle.length > 3) {
  //       Toast.show({
  //         type: "error",
  //         text1: "You can save a maximum of 4 default messages!",
  //       });
  //       return;
  //     }
  //     navigation.navigate("ProfileViewMessageModal", {
  //       id: id,
  //       callBackMethod: messageEditUpdateCallBackMethod,
  //     });
  //   } else if (type === "tags") {
  //     if (tagEditEnable && onTagEdit !== "") {
  //       handleTagClickDone();
  //       setonTagEdit("");
  //     } else {
  //       settagEditEnable(!tagEditEnable);
  //       !tagEditEnable ? tagEditFRef.current.focus() : null;
  //     }
  //   }
  // };

  // Tag Edit Add and Remove

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

  // const handleTagClickDone = () => {
  //   let newTag;
  //   if (onTagEdit === "" || onTagEdit === undefined) {
  //     return;
  //   } else if (onTagEdit.charAt(0) === "#") {
  //     newTag = tags + " " + onTagEdit;
  //   } else {
  //     newTag = tags + " #" + onTagEdit;
  //   }
  //   realm.write(() => {
  //     realm.create(
  //       "Profile",
  //       {
  //         _id: "1",
  //         defaultTags: newTag,
  //       },
  //       true
  //     );
  //   });
  //   refreshTagView();
  //   Toast.show({ text1: "Successfully " + newTag + " Added..!" });
  // };

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

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    let index;
    if (offsetX <= 0) {
      index = 0;
    } else {
      index = Math.floor(offsetX / width) + 1;
    }
    setmsgIndxCount(index);
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

  return (
    <View style={ProfileTemplateStyle.parentContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Manage Profile Container  */}
        <LinearGradient
          colors={["#4B3A33", "#262626"]}
          style={ProfileTemplateStyle.manageProfileContainer}
        >
          <View style={ProfileTemplateStyle.manageHeadingContainer}>
            <TouchableOpacity onPress={() => goBackMethodCall()}>
              <MaterialIcons
                name="keyboard-backspace"
                size={26}
                style={ProfileTemplateStyle.backIcon}
              />
            </TouchableOpacity>
            <Text style={ProfileTemplateStyle.myProfileText}>My Profile</Text>
          </View>
          <View style={ProfileTemplateStyle.discriptionContainer}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={ProfileTemplateStyle.image}
              />
            ) : (
              <Image
                source={require("../assets/images/user_img.png")}
                style={ProfileTemplateStyle.image}
              />
            )}

            <View style={ProfileTemplateStyle.displayUserDetailsContainer}>
              <Text style={ProfileTemplateStyle.titleName}>
                {name == "" ? "Name" : name}
              </Text>
              <Text style={ProfileTemplateStyle.titlePhone}>
                {phone == "" ? "xxxx-xxx-xxx" : phone}
              </Text>
              <Text style={ProfileTemplateStyle.titleEmail}>
                {email == "" ? "xxxxx@gmail.com" : email}
              </Text>
            </View>

            <View style={ProfileTemplateStyle.manageProfileIconContainer}>
              <TouchableOpacity>
                <Feather
                  name="edit-3"
                  color="#7A7776"
                  size={24}
                  onPress={() => profileInfoNavigation()}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  color="#7A7776"
                  size={24}
                  onPress={() => qrImageNavigation()}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Tags Container */}
        <View style={ProfileTemplateStyle.tagsContainer}>
          <View style={ProfileTemplateStyle.tagsHeadingContainer}>
            <Text style={ProfileTemplateStyle.tagsHeadingText}>Tags</Text>
            <TouchableOpacity style={ProfileTemplateStyle.addIconContainer}>
              <Ionicons
                name="add"
                color="#7A7776"
                size={28}
                onPress={() => modulePopupShow("tags")}
              />
            </TouchableOpacity>
          </View>

          <Text>
            {tags.split(" ").map((item, index) => {
              {
                /* {tags.split(" ").map((item) => { */
              }
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => deleteOnPress(item)}
                >
                  <View style={ProfileTemplateStyle.profileHashtags}>
                    <Text style={ProfileTemplateStyle.tagsContent}>{item}</Text>
                    <Entypo
                      name="cross"
                      size={18}
                      onPress={() => modulePopupShow("tags")}
                      style={ProfileTemplateStyle.crossIcon}
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
        </View>

        {/* Message Container */}
        <View style={[ProfileTemplateStyle.profileMessageContainer]}>
          <View style={ProfileTemplateStyle.messageHeadingContainer}>
            <Text style={ProfileTemplateStyle.messageHeadingText}>
              Message{" "}
            </Text>
            {/* <Text
                style={{
                  size: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  color: "#E8E8E8",
                }}
              >
                {msgIndxCount + 1}/{messageTitle?.length}
              </Text> */}

            <TouchableOpacity style={{ paddingRight: 8 }}>
              <Ionicons
                name="add"
                color="#7A7776"
                size={28}
                onPress={() =>
                  modulePopupShow("message", messageTitle?.length + 1)
                }
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            onMomentumScrollEnd={handleScroll}
            showsHorizontalScrollIndicator={false}
          >
            {/* Message - 1 */}
            {messageTitle?.map((item, index) => {
              return (
                <View
                  style={{
                    marginTop: 10,
                    width: width - 40,
                    borderRadius: 10,
                    backgroundColor: "#353535",
                    borderStyle: "dashed",
                    borderColor: "#515151",
                    borderWidth: 1,
                    padding: 10,
                    marginLeft: 2 + index,
                    marginRight: 2 + index,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => modulePopupShow("message", index + 1)}
                  >
                    <Text style={ProfileTemplateStyle.messageText}>
                      {message?.[index]}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          <View style={ProfileTemplateStyle.messageDotsContainer}>
            {message?.map((item, index) => {
              return (
                <View
                  style={{
                    backgroundColor:
                      index === msgIndxCount ? "#C1C1C1" : "#4E4D4D",
                    width: index === msgIndxCount ? 20 : 8,
                    height: 8,
                    margin: 2,
                    borderRadius: 5,
                  }}
                />
              );
            })}
          </View>
        </View>

        <View style={{ height: 200 }}></View>
      </ScrollView>
    </View>
  );
};

export default ProfileTemplate;
