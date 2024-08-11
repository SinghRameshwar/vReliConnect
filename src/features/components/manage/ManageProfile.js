import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { realm } from "../../../stores/DatabaseObj";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ManageProfileStyle from "../../style/profileStyle/ManageProfileStyle";
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";

const UserProfileInfo = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [linkedinQR, setLinkedinQR] = useState("");
  const [cardDetailsQR, setCardDetailsQR] = useState("");
  const [activeButton, setActiveButton] = useState("LinkedIn");
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle image upload
  const pickImage = (type) => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response && !response.didCancel) {
        const uri = response.assets[0]?.uri;
        let imgObj = {};

        if (type === "profile") {
          setImage(uri);
          imgObj = {
            _id: "1",
            profle_image: uri,
          };
        } else if (type === "linkedinQr") {
          setLinkedinQR(uri);
          imgObj = {
            _id: "1",
            linking_qr_image: uri,
          };
        } else if (type === "cardDetailsQr") {
          setCardDetailsQR(uri);
          imgObj = {
            _id: "1",
            contact_qr_image: uri,
          };
        }
        realm.write(() => {
          realm.create("Profile", imgObj, true);
        });
      }
    });
  };

  useEffect(() => {
    const profile1 = realm.objects("Profile");
    setName(profile1[0].name);
    setPhone(profile1[0].usermob);
    setEmail(profile1[0].useremail);
    setLinkedinQR(profile1[0].linking_qr_image);
    setCardDetailsQR(profile1[0].contact_qr_image);
    setImage(profile1[0].profle_image);
  }, []);

  const handleChangeName = (text) => {
    setUpdatedName(text);
    if (!isEditing) setIsEditing(true);
  };

  const handleChangePhone = (num) => {
    setUpdatedPhone(num);
    if (!isEditing) setIsEditing(true);
  };

  const handleChangeEmail = (text) => {
    setUpdatedEmail(text);
    if (!isEditing) setIsEditing(true);
  };

  const handleUpdateProfile = () => {
    // Check if the updated phone number is empty or not a 10-digit number
    if (updatedPhone !== "" && updatedPhone.length !== 10) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    // Check if the updatedPhone is empty
    if (!updatedPhone.trim() && updatedPhone !== "") {
      Alert.alert(
        "Cannot update user profile",
        "Please enter your phone number."
      );
      return;
    }

    // check if the updatedEmail is empty
    if (!updatedEmail.trim() && updatedEmail !== "") {
      Alert.alert(
        "Cannot update user profile",
        "Please enter your email address."
      );
      return;
    }

    // Check if the updatedEmail is invalid
    if (!isValidEmail(updatedEmail) && updatedEmail !== "") {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setName(updatedName);
    setPhone(updatedPhone);
    setEmail(updatedEmail);

    const profile1 = realm.objects("Profile");
    let profileObj = profile1[0];
    let object = {
      ...profileObj,
      name: updatedName,
      usermob: updatedPhone,
      useremail: updatedEmail,
      linking_qr_image: linkedinQR,
      contact_qr_image: cardDetailsQR,
    };

    try {
      realm.write(() => {
        realm.create("Profile", object, true);
      });
    } catch (error) {
      console.log("--------", error);
    }
    Toast.show({
      text1: "Profile Successfully Updated!",
      style: ManageProfileStyle.toastContainer,
      textStyle: ManageProfileStyle.toastText,
    });

    setIsEditing(false);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const linkedinQRUpload = () => {
    if (activeButton === "LinkedIn") {
      pickImage("linkedinQr");
    } else {
      pickImage("cardDetailsQr");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={ManageProfileStyle.userProfileContainer}
    >
      {/* edit profile heading section  */}
      <LinearGradient
        colors={["#262626", "#4B3A33"]}
        style={ManageProfileStyle.editProfileHeadingContainer}
      >
        <Text style={ManageProfileStyle.profileHeading}>My Profile</Text>
      </LinearGradient>

      <LinearGradient colors={["#151515", "#262626"]}>
        {/* Display Image */}
        <View style={ManageProfileStyle.displayImageContainer}>
          <TouchableOpacity
            style={ManageProfileStyle.imageContainer}
            onPress={() => pickImage("profile")}
          >
            {image ? (
              <Image source={{ uri: image }} style={ManageProfileStyle.image} />
            ) : (
              <Image
                source={require("../../../assets/images/user_img.png")}
                style={ManageProfileStyle.image}
              />
            )}
          </TouchableOpacity>
          <Image
            style={ManageProfileStyle.editImgIcon}
            source={require("../../../assets/images/edit_icon.png")}
          />
        </View>

        {/* Display Personal Details */}
        <View style={ManageProfileStyle.manageProfileHeader}>
          <Text style={ManageProfileStyle.personalDetailsHeading}>
            Personal Details
          </Text>
          <TouchableOpacity onPress={isEditing ? handleUpdateProfile : () => setIsEditing(true)}>
            <Text style={ManageProfileStyle.personalDetailsHeading}>
              {isEditing ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Name */}
        <View style={ManageProfileStyle.userProfileDetailsContainer}>
          <View style={{ marginTop: 6 }}>
            <TextInput
              value={isEditing ? updatedName : name}
              placeholder="John Due"
              maxLength={40}
              multiline={false}
              editable={isEditing}
              onChangeText={(text) => handleChangeName(text)}
              placeholderTextColor="#C1C1C1"
              style={{
                marginTop: 8,
                paddingHorizontal: 8,
                paddingVertical: 6,
                fontSize: 14,
                lineHeight: 16,
                fontWeight: "400",
                color: "#C1C1C1",
                borderRadius: 6,
                backgroundColor: "#262626",
              }}
            />
          </View>

          {/* User Phone */}
          <View style={{ marginTop: 8 }}>
            <TextInput
              value={isEditing ? updatedPhone : phone}
              placeholder="9999999999"
              keyboardType="numeric"
              maxLength={10}
              multiline={false}
              editable={isEditing}
              onChangeText={(num) => handleChangePhone(num)}
              placeholderTextColor="#C1C1C1"
              style={{
                paddingHorizontal: 8,
                paddingVertical: 6,
                fontSize: 14,
                lineHeight: 16,
                fontWeight: "400",
                color: "#C1C1C1",
                borderRadius: 6,
                backgroundColor: "#262626",
              }}
            />
          </View>

          {/* User Email */}
          <View style={{ marginTop: 8 }}>
            <TextInput
              value={isEditing ? updatedEmail : email}
              placeholder="johndue@gmail.com"
              multiline={false}
              keyboardType="email-address"
              maxLength={40}
              editable={isEditing}
              onChangeText={(text) => handleChangeEmail(text)}
              placeholderTextColor="#C1C1C1"
              style={{
                paddingHorizontal: 8,
                paddingVertical: 6,
                fontSize: 14,
                lineHeight: 16,
                fontWeight: "400",
                color: "#C1C1C1",
                borderRadius: 6,
                backgroundColor: "#262626",
              }}
            />
          </View>
        </View>

        {/* QR-Code Container */}
        <View style={ManageProfileStyle.qrCodeContainer}>
          <View style={ManageProfileStyle.myQrCodeContainer}>
            <Text style={ManageProfileStyle.qrCodeText}>My Qr Code</Text>
            <MaterialCommunityIcons
              name="qrcode-scan"
              color="#7A7776"
              size={20}
              style={ManageProfileStyle.qrIcon}
            />
          </View>

          <View style={ManageProfileStyle.toggleBtnContainer}>
            <TouchableOpacity
              style={{
                ...ManageProfileStyle.linkedinBtn,
                backgroundColor:
                  activeButton === "LinkedIn" ? "#84FFB5" : "#262626",
              }}
              onPressIn={() => setActiveButton("LinkedIn")}
            >
              <Text
                style={{
                  ...ManageProfileStyle.linkedinText,
                  color: activeButton === "LinkedIn" ? "#1C1C1C" : "#747474",
                }}
              >
                LinkedIn
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...ManageProfileStyle.cardDetailsBtn,
                backgroundColor:
                  activeButton === "CardDetails" ? "#84FFB5" : "#262626",
              }}
              onPressIn={() => setActiveButton("CardDetails")}
            >
              <Text
                style={{
                  ...ManageProfileStyle.cardDetailsText,
                  color: activeButton === "CardDetails" ? "#1C1C1C" : "#747474",
                }}
              >
                Card Details
              </Text>
            </TouchableOpacity>
          </View>

          <View style={ManageProfileStyle.scanContainer}>
            {activeButton === "LinkedIn" &&
              (linkedinQR === "" ? (
                <Image
                  source={require("../../../assets/images/qrcode_img.png")}
                />
              ) : (
                <Image
                  source={{ uri: linkedinQR }}
                  style={ManageProfileStyle.scanImgContainer}
                />
              ))}

            {activeButton === "CardDetails" &&
              (cardDetailsQR === "" ? (
                <Image
                  source={require("../../../assets/images/qrcode_img.png")}
                />
              ) : (
                <Image
                  source={{ uri: cardDetailsQR }}
                  style={ManageProfileStyle.scanImgContainer}
                />
              ))}
          </View>
          <TouchableOpacity onPress={() => linkedinQRUpload()}>
            <Text style={ManageProfileStyle.updateQrText}>Update Qr Code</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default UserProfileInfo;
