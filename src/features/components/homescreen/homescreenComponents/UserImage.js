import { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import UserImageStyle from "../../../style/homescreenStyle/homescreenComponentsStyle/UserImageStyle";

const UserImage = ({ item, image, setImage }) => {
  useEffect(() => {
    // Initialize selected image with item.image1 if it exists
    if (item?.image1) {
      setImage(item.image1);
    }
  }, [item]);

  const pickImage = (indexKey) => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response && !response.didCancel) {
        const uri = response.assets[0]?.uri;
        // let tableNam;
        // let createdObj = {};
        // if (indexKey?.eventId === undefined) {
        //   tableNam = "Event";
        //   createdObj = {
        //     id: indexKey?.id,
        //     image1: uri,
        //   };
        // } else {
        //   tableNam = "Eventgroup";
        //   createdObj = {
        //     id: indexKey?.id,
        //     image1: uri,
        //   };
        // }
        // realm.write(() => {
        //   realm.create(tableNam, createdObj, true);
        // });
        setImage(uri);
      }
    });
  };

  return (
    <View style={UserImageStyle.displayPhotoContainer}>
      <TouchableOpacity onPress={() => pickImage(item)}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../../../../assets/images/img_background.jpg")
          }
          style={UserImageStyle.displayPhoto}
          resizeMode="cover"
        />
        {!image && (
          <TouchableOpacity
            style={{
              zIndex: 1,
              position: "absolute",
              top: "40%",
              left: "46%",
              alignSelf: "center",
              transform: [{ translateX: -22 }, { translateY: -24 }],
            }}
            onPress={() => pickImage(item)}
          >
            <Image
              source={require("../../../../assets/images/img_profile.png")}
              style={{
                height: 80,
                width: 80,
              }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserImage;
