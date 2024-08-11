import React from "react";
import { Text, TouchableOpacity } from "react-native";
import StretchedButtonStyle from "../style/StretchedButtonStyle";

const StretchedButton = ({
  backgroundColor,
  borderColor,
  buttonContent,
  marginTop,
  shareActionMethodCall
}) => {
  return (
    <TouchableOpacity onPress={() => shareActionMethodCall()}
      style={[
        StretchedButtonStyle.buttonContainer,
        { backgroundColor, borderColor, marginTop },
      ]}
    >
      <Text style={StretchedButtonStyle.buttonContent}>{buttonContent}</Text>
    </TouchableOpacity>
  );
};

export default StretchedButton;
