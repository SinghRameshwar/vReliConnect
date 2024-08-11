import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProfileTemplateStyle from "../style/ProfileTemplateStyle";
import QrImageStyle from "../style/QrImageStyle";
import LinearGradient from "react-native-linear-gradient";
import UserProfileInfoStyle from "../style/UserProfileInfoStyle";
import { realm } from "../stores/DatabaseObj";
import * as ImagePicker from "react-native-image-picker";

const QRimage = ({ navigation }) => {
  const [linkedinQR, setlinkedinQR] = useState("");
  const [cardDetailsQR, setcardDetailsQR] = useState("");
  const [activeButton, setActiveButton] = useState("LinkedIn");

  const pickImage = (type) => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response && !response.didCancel) {
        const uri = response.assets[0]?.uri;
        let imgobj = {};

        if (type === "profile") {
          setImage(uri);
          imgobj = {
            _id: "1",
            profle_image: uri,
          };
        } else if (type === "linkedinQr") {
          setlinkedinQR(uri);
          imgobj = {
            _id: "1",
            linking_qr_image: uri,
          };
        } else if (type === "cardDetailsQr") {
          setcardDetailsQR(uri);
          imgobj = {
            _id: "1",
            contact_qr_image: uri,
          };
        }
        realm.write(() => {
          realm.create("Profile", imgobj, true);
        });
      }
    });
  };

  useEffect(() => {
    const profile1 = realm.objects("Profile");
    setlinkedinQR(profile1[0].linking_qr_image);
    setcardDetailsQR(profile1[0].contact_qr_image);
  }, []);

  const linkedinQRUpload = () => {
    if (activeButton === "LinkedIn") {
      pickImage("linkedinQr");
    } else {
      pickImage("cardDetailsQr");
    }
  };

  const goBackMethodCall = () => {
    navigation.goBack();
  };

  return (
    <View style={QrImageStyle.qrImageContainer}>
      {/* Qr Code heading section */}
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
          <Text style={QrImageStyle.qrCodeHeading}>Your Qr Code</Text>
        </View>
      </LinearGradient>

      {/* Toggle button Container */}
      <View style={{ marginTop: 120 }}>
        <View style={UserProfileInfoStyle.toggleBtnContainer}>
          <TouchableOpacity
            style={{
              ...UserProfileInfoStyle.linkedinBtn,
              backgroundColor:
                activeButton === "LinkedIn" ? "#84FFB5" : "#262626",
            }}
            onPressIn={() => setActiveButton("LinkedIn")}
          >
            <Text
              style={{
                ...UserProfileInfoStyle.linkedinText,
                color: activeButton === "LinkedIn" ? "#1C1C1C" : "#747474",
              }}
            >
              LinkedIn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...UserProfileInfoStyle.cardDetailsBtn,
              backgroundColor:
                activeButton === "CardDetails" ? "#84FFB5" : "#262626",
            }}
            onPressIn={() => setActiveButton("CardDetails")}
          >
            <Text
              style={{
                ...UserProfileInfoStyle.cardDetailsText,
                color: activeButton === "CardDetails" ? "#1C1C1C" : "#747474",
              }}
            >
              Card Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Qr Container */}
      <View style={UserProfileInfoStyle.scanContainer}>
        {activeButton === "LinkedIn" &&
          (linkedinQR === "" ? (
            <Image source={require("../assets/images/qrcode_img.png")} />
          ) : (
            <Image
              source={{ uri: linkedinQR }}
              style={UserProfileInfoStyle.scanImgContainer}
            />
          ))}

        {activeButton === "CardDetails" &&
          (cardDetailsQR === "" ? (
            <Image source={require("../assets/images/qrcode_img.png")} />
          ) : (
            <Image
              source={{ uri: cardDetailsQR }}
              style={UserProfileInfoStyle.scanImgContainer}
            />
          ))}
      </View>
      <TouchableOpacity onPress={() => linkedinQRUpload()}>
        <Text style={UserProfileInfoStyle.updateQrText}>Update Qr Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QRimage;
