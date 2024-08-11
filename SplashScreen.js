import { View } from "react-native";
import React, { useEffect } from "react";
import AppLogo from "./src/appLogo/AppLogo";
import { DefaultEventCreate } from "./src/stores/DefaultEventCreate";
import { DefaultProfileCreate } from "./src/stores/DefaultProfileCreate";

const SplashScreen = ({ navigation }) => {
  const rootViewShow = async () => {
    navigation.replace("HomeContainer");
  };

  useEffect(() => {
     DefaultProfileCreate();
     DefaultEventCreate();
    
    const timer = setTimeout(() => {
      rootViewShow();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <AppLogo navigation={navigation} />
    </View>
  );
};

export default SplashScreen;
