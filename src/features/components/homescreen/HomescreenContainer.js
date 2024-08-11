import { View, SafeAreaView, ScrollView, Alert } from "react-native";
import { realm } from "../../../stores/DatabaseObj";
import { useEffect, useRef, useState } from "react";
import UserImage from "../../../features/components/homescreen/homescreenComponents/UserImage";
import AddContactDetails from "./homescreenComponents/AddContactDetails";
import AddMessage from "./homescreenComponents/AddMessage";
import AddTags from "../../../features/components/homescreen/homescreenComponents/AddTags";
import HomescreenContainerStyle from "../../style/homescreenStyle/HomescreenContainerStyle";
import Toast from "react-native-toast-message";
import ManageProfile from "../../components/manage/ManageProfile";
import QrCodeScannerTest from "../../../templateScreens/QrCodeScannerTest";
import BackIconContainer from "../../../common/components/BackIconContainer";
import StretchedButton from "../../../common/components/StretchedButton";
import LinearGradient from "react-native-linear-gradient";
import BottomNavbar from "../../../common/components/BottomNavbar";
import DefaultEvents from "../events/DefaultEvents";
import ActiveEventName from "../logs/ActiveEventName";
import { newGroupOfEvent } from "../../../templateScreens/constants/eventData";
import { format } from "date-fns";
import { shareDetails } from "../../../common/helperMethod/CommanMethods";

const HomeContainer = ({ route, navigation }) => {
  const [currentView, setcurrentView] = useState({});
  const [isPartyEdit, setisPartyEdit] = useState(true);
  const [isEditMessage, setisEditMessage] = useState(false);
  const [currentMessage, setcurrentMessage] = useState("");
  const [image, setImage] = useState("");
  const [meet_name, setmeet_name] = useState("");
  const [mob_num1, setmob_num1] = useState("");
  const [mob_num2, setmob_num2] = useState("");
  const [mail_Id1, setmail_Id1] = useState("");
  const [mail_Id2, setmail_Id2] = useState("");
  const [selectedTag, setselectedTag] = useState([]);
  const [selectTabBtn, setselectTabBtn] = useState(3);
  const [isVisibleBottomNavbar, setisVisibleBottomNavbar] = useState(false);
  const onbackClick = useRef(false);

  useEffect(() => {
    refreshData();
  }, []);

  // Seleted Event Filter
  const refreshData = () => {
    const events = realm.objects("Event");
    const activeEvents = events.filtered('status == "active"');
    setcurrentView(activeEvents[0]);
  };

  // Get Contacts of Client by Scanned QR Code
  const scannedQrCodeData = (data) => {
    setmeet_name(data.name);
    setmob_num1(data.tel);
    setmob_num2(data.tel2);
    setmail_Id1(data.email);
    setmail_Id2(data.email2);
  };

  // Function for bottom nav
  const modulePopupShow = (type) => {
    if (type === "profile") {
      onbackClick.current = false;
      selectTabBtmAction(1);
    } else if (type === "logs") {
      selectTabBtmAction(2);
    } else if (type === "newcontacts") {
      if (selectTabBtn !== 3) {
        selectTabBtmAction(3);
      }
    } else if (type === "event") {
      onbackClick.current = true;
      selectTabBtmAction(4);
    } else if (type === "qrcode") {
      onbackClick.current = false;
      selectTabBtmAction(5);
    }
  };

  const selectTabBtmAction = (type) => {
    if (selectTabBtn !== type) {
      setselectTabBtn(type);
    }
  };

  const saveCancelAction = (actionType) => {
    if (actionType === "Save") {
      onSaveDatainLocal();
    } else if (actionType === "back") {
    }
  };

  const clearSavedData = () => {
    setmeet_name("");
    setmob_num1("");
    setmob_num2("");
    setmail_Id1("");
    setmail_Id2("");
    setImage("");
  };

  const onSaveDatainLocal = () => {
    if (meet_name === "") {
      Toast.show({ type: "error", text1: "Please Enter Client Name" });
      return;
    }
    let newEventCreate = {
      ...newGroupOfEvent,
      image1: image,
      meet_name: meet_name,
      mob_num1: mob_num1,
      mob_num2: mob_num2,
      mail_Id1: mail_Id1,
      mail_Id2: mail_Id2,
      event_mess: [currentMessage],
      event_tags: [...selectedTag],
      status: "",
      id: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      eventId: currentView.id + "",
    };

    try {
      realm.write(() => {
        realm.create("Eventgroup", newEventCreate, true);
      });
      Toast.show({
        type: "success",
        text1: "Contact details successfully saved",
      });
      clearSavedData();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const globalMethodCallWhenBackOnMainScreen = (types) => {
    if (types === "event") {
      refreshData();
      setselectTabBtn(3);
    }
  };

  const shareActionMethodCall = () => {
    let data = {
      image1: image,
      mail_Id1: mail_Id1,
      event_messtitle: "Event Shared",
      event_mess: currentMessage,
      event_tags: selectedTag,
    };
    shareDetails(data);
  };

  return (
    <SafeAreaView style={HomescreenContainerStyle.homescreenContainer}>
      <LinearGradient
        colors={["#151515", "#262626"]}
        style={[HomescreenContainerStyle.homescreenContainer]}
      >
        {selectTabBtn === 1 && (
          <View style={[HomescreenContainerStyle.homescreenContainer]}>
            <ManageProfile />
          </View>
        )}

        {selectTabBtn === 3 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Back Icon Wrapper */}
            <BackIconContainer
              endContent="Save"
              saveCancelAction={saveCancelAction}
              currentView={currentView}
            />

            {/* User Image Wrapper */}
            <UserImage item={currentView} image={image} setImage={setImage} />

            {/* Add Contact details Wrapper */}
            <AddContactDetails
              item={currentView}
              isPartyEdit={isPartyEdit}
              setisPartyEdit={setisPartyEdit}
              meet_name={meet_name}
              setmeet_name={setmeet_name}
              mob_num1={mob_num1}
              setmob_num1={setmob_num1}
              mob_num2={mob_num2}
              setmob_num2={setmob_num2}
              mail_Id1={mail_Id1}
              setmail_Id1={setmail_Id1}
              mail_Id2={mail_Id2}
              setmail_Id2={setmail_Id2}
            />

            {/* Message Wrapper */}
            <AddMessage
              item={currentView}
              isEditMessage={isEditMessage}
              setisEditMessage={setisEditMessage}
              currentMessage={currentMessage}
              setcurrentMessage={setcurrentMessage}
            />

            {/* Add Tags Wrapper */}
            <AddTags
              item={currentView}
              selectedTag={selectedTag}
              setselectedTag={setselectedTag}
            />

            {/* Button if user adds the info */}
            {meet_name && (
              <StretchedButton
                backgroundColor="#84FFB5"
                borderColor="#89FFB8"
                marginTop={20}
                buttonContent="Connect"
                shareActionMethodCall={shareActionMethodCall}
              />
            )}
            <View style={{ height: 100 }} />
          </ScrollView>
        )}

        {selectTabBtn === 2 && (
          <View style={[HomescreenContainerStyle.container]}>
            <ActiveEventName
              setisVisible={setisVisibleBottomNavbar}
              setselectTabBtn={setselectTabBtn}
            />
          </View>
        )}

        {selectTabBtn === 4 && (
          <View style={[HomescreenContainerStyle.container]}>
            <DefaultEvents
              navigation={navigation}
              setisVisible={setisVisibleBottomNavbar}
              globalMethodCallWhenBackOnMainScreen={
                globalMethodCallWhenBackOnMainScreen
              }
            />
          </View>
        )}

        {selectTabBtn === 5 && (
          <View style={[HomescreenContainerStyle.container]}>
            <QrCodeScannerTest
              scannedQrCodeData={scannedQrCodeData}
              setselectTabBtn={setselectTabBtn}
            ></QrCodeScannerTest>
          </View>
        )}

        <BottomNavbar
          modulePopupShow={modulePopupShow}
          selectTabBtn={selectTabBtn}
          isVisible={isVisibleBottomNavbar}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeContainer;
