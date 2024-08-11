import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomNavbarStyle from "../style/BottomNavbarStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BottomNavbar = ({ modulePopupShow, selectTabBtn, isVisible }) => {
  return (
    <View style = {{display: 
    isVisible ? "none" : "flex"}}>
      {/* Add Icon Container  */}
      <LinearGradient
        colors={["#FF8866", "#FF3838", "#FE3403"]}
        style={[BottomNavbarStyle.bottomAddContainer]}
      >
        <TouchableOpacity onPress={() => modulePopupShow("newcontacts")}>
          <Ionicons
            name={selectTabBtn !== 3 ? "home-outline" : "add"}
            color="#E8E8FF"
            size={28}
            style={BottomNavbarStyle.bottomAddIcon}
          />
        </TouchableOpacity>
      </LinearGradient>

      <View style={BottomNavbarStyle.bottomIconsContainer}>
        {/* Manage Profile */}
        <TouchableOpacity
          style={BottomNavbarStyle.iconContainer}
          onPress={() => modulePopupShow("profile")}
        >
          <AntDesign
            name="setting"
            color={selectTabBtn === 1 ? "#E8E8E8" : "#7A7776"}
            size={28}
            style={BottomNavbarStyle.icon}
          />
          <Text
            style={[
              BottomNavbarStyle.iconText,
              {
                color: selectTabBtn === 1 ? "#E8E8E8" : "#7A7776",
              },
            ]}
          >
            Manage
          </Text>
        </TouchableOpacity>

        {/* Manage Logs */}
        <TouchableOpacity
          style={BottomNavbarStyle.iconContainer}
          onPress={() => modulePopupShow("logs")}
        >
          <FontAwesome5
            name="users"
            color={selectTabBtn === 2 ? "#E8E8E8" : "#7A7776"}
            size={26}
            style={[BottomNavbarStyle.icon]}
          />
          <Text
            style={[
              BottomNavbarStyle.iconText,
              {
                color: selectTabBtn === 2 ? "#E8E8E8" : "#7A7776",
              },
            ]}
          >
            Logs
          </Text>
        </TouchableOpacity>

        {/* Events */}
        <TouchableOpacity
          style={BottomNavbarStyle.iconContainer}
          onPress={() => modulePopupShow("event")}
        >
          <MaterialCommunityIcons
            name="calendar-month-outline"
            color={selectTabBtn === 4 ? "#E8E8E8" : "#7A7776"}
            size={26}
            style={[BottomNavbarStyle.icon]}
          />
          <Text
            style={[
              BottomNavbarStyle.iconText,
              {
                color: selectTabBtn === 4 ? "#E8E8E8" : "#7A7776",
              },
            ]}
          >
            Event
          </Text>
        </TouchableOpacity>

        {/* Scan */}
        <TouchableOpacity
          style={BottomNavbarStyle.iconContainer}
          onPress={() => modulePopupShow("qrcode")}
        >
          <MaterialIcons
            name="qr-code-scanner"
            color={selectTabBtn === 5 ? "#E8E8E8" : "#7A7776"}
            size={26}
            style={BottomNavbarStyle.icon}
          />
          <Text
            style={[
              BottomNavbarStyle.iconText,
              {
                color: selectTabBtn === 5 ? "#E8E8E8" : "#7A7776",
              },
            ]}
          >
            Scan
          </Text>
        </TouchableOpacity>
      </View>

      <View style={BottomNavbarStyle.bottomView} />
    </View>
  );
};

export default BottomNavbar;
