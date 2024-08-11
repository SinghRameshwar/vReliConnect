import { View, Image } from "react-native";
import React from "react";

const AppLogo = ({ navigation }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#000000",
      }}
    >
      <Image
        source={require("../assets/images/app_logo.png")}
        resizeMode="center"
      />
    </View>
  );
};

export default AppLogo;
