import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BackIconContainerStyle from "../style/BackIconContainerStyle";

const BackIconContainer = ({endContent, saveCancelAction,currentView}) => {

  return (
    <View style={BackIconContainerStyle.backIconContainer}>
      <TouchableOpacity onPress={() => saveCancelAction('back')}>
        <MaterialIcons
          name="keyboard-backspace"
          size={28}
          style={BackIconContainerStyle.backIcon}
        />
      </TouchableOpacity>

      {/* Show middle content when event is added & user navigates backs to homescreen */}
      <View>
        <Text style={BackIconContainerStyle.middleContent}>{currentView.name}</Text>
      </View>

      {/* if user is adding details to save */}
      <TouchableOpacity onPress={() => saveCancelAction(endContent)}>
        <Text style={BackIconContainerStyle.endContent}>{endContent}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default BackIconContainer;
