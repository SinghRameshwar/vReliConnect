import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";
import ProfileViewTagsModalStyle from "../style/ProfileViewTagsModalStyle";
import ProfileViewMessageModalStyle from "../style/ProfileViewMessageModalStyle";
import { realm } from "../stores/DatabaseObj";
import Toast from "react-native-toast-message";

const ProfileViewMessageModal = ({ route, navigation }) => {
  const [message, setMessage] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const profileData = useRef({});
  const defaultTitle = useRef("");
  const defaultmessage = useRef("");
  const messagesArr = useRef([]);
  const titlemessagesArr = useRef([]);
  const { callBackMethod } = route.params;

  const handleMessageTitle = (text) => {
    setMessageTitle(text);
  };

  const handleChangeText = (text) => {
    setMessage(text);
  };

  useEffect(() => {
    const tasks = realm.objects("Profile");
    profileData.current = tasks[0];
    setMessage(profileData?.current?.message[route?.params?.id - 1]);
    setMessageTitle(profileData?.current?.mess_title[route?.params?.id - 1]);
    defaultTitle.current =
      profileData?.current?.mess_title[route?.params?.id - 1];
    defaultmessage.current =
      profileData?.current?.message[route?.params?.id - 1];
    messagesArr.current = profileData?.current?.message;
    titlemessagesArr.current = profileData?.current?.mess_title;
  }, []);

  const titleAndMessageType = () => {
    let message1 = [...messagesArr.current];
    let message1title = [...titlemessagesArr.current];
    message1[route?.params?.id - 1] = message;
    message1title[route?.params?.id - 1] = messageTitle;

    let messageObj = {
      _id: "1",
      message: message1,
      mess_title: message1title,
    };
    return messageObj;
  };

  const handleSave = () => {
    if (messageTitle == "" || messageTitle == undefined) {
      Alert.alert("Write Some Message subject Text");
      return;
    } else if (message == "" || message == undefined) {
      Alert.alert("Write Some Message Text");
      return;
    }

    try {
      realm.write(() => {
        realm.create("Profile", titleAndMessageType(), true);
      });
      let message = "Message successfully update!";
      // Show toast message
      Toast.show({
        type: "success",
        text1: message,
      });
      // Close the modal
      navigation.goBack();
      callBackMethod();
    } catch (error) {
      console.log("Error saving message:", error);
    }
  };

  const backGroungClickHandel = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => backGroungClickHandel()}>
      <View style={styles.container}>
        <View style={ProfileViewMessageModalStyle.viewMessageWrapper}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>Messages</Text>
          <View style={ProfileViewMessageModalStyle.messageTitleContainer}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Subject</Text>
            <TextInput
              style={ProfileViewMessageModalStyle.subMessageHeading}
              multiline={true}
              maxLength={200}
              defaultValue={defaultTitle.current}
              onChangeText={(text) => handleMessageTitle(text)}
              placeholderTextColor={"#9bafbe"}
              autoFocus={true}
            />
          </View>
          <TextInput
            style={ProfileViewMessageModalStyle.messageContent}
            multiline={true}
            defaultValue={defaultmessage.current}
            onChangeText={(text) => handleChangeText(text)}
            textAlignVertical="top"
            autoFocus={true}
          />
        </View>
        <View
          style={[ProfileViewTagsModalStyle.btnContainer, { marginBottom: 40 }]}
        >
          <TouchableOpacity
            style={ProfileViewTagsModalStyle.cancelBtnWrapper}
            onPress={() => navigation.goBack()}
          >
            <Text style={ProfileViewTagsModalStyle.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ProfileViewTagsModalStyle.saveBtnWrapper}
            onPress={() => handleSave()}
          >
            <Text style={ProfileViewTagsModalStyle.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: "#365e7d",
    borderTopWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  titleBold: {
    marginVertical: 20,
    fontFamily: "Open-Sans",
    fontSize: 14,
    fontWeight: "800",
    color: "#365e7d",
  },
});

export default ProfileViewMessageModal;
