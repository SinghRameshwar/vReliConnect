import React from "react";
import { Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import TitleHeadingStyle from "../style/TitleHeadingStyle";

const TitleHeading = ({ titleHeading }) => {
  return (
    <LinearGradient
      colors={["#4B3A33", "#262626"]}
      style={TitleHeadingStyle.editProfileHeadingContainer}
    >
      <Text style={TitleHeadingStyle.profileHeading}>{titleHeading}</Text>
    </LinearGradient>
  );
};
export default TitleHeading;
