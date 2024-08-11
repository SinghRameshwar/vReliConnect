import { View, TouchableOpacity, TextInput } from "react-native";
import AddContactDetailsStyle from "../../../style/homescreenStyle/homescreenComponentsStyle/AddContactDetailsStyle";
import { useRef, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { realm } from "../../../../stores/DatabaseObj";

const phonePattern = /^[0-9]{10}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AddContactDetails = ({
  item,
  isPartyEdit,
  setisPartyEdit,
  meet_name,
  setmeet_name,
  mob_num1,
  setmob_num1,
  mob_num2,
  setmob_num2,
  mail_Id1,
  setmail_Id1,
  mail_Id2,
  setmail_Id2,
}) => {
  const [showContactField, setShowContactField] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const partyNameEditRef = useRef(null);
  const partyMobileEditRef = useRef(null);
  const partyEmailEditRef = useRef(null);
  const partyMobileEditRef2 = useRef(null);
  const partyEmailEditRef2 = useRef(null);

  // Function to toggle display of contact number field
  const toggleContactNumberField = () => {
    setShowContactField(!showContactField);
  };

  // Function to toggle display of email field
  const toggleEmailField = () => {
    setShowEmailField(!showEmailField);
  };

  // Call When Client Edit Done
  const handleDonePress = (indexKey) => {
    if (!phonePattern.test(mob_num1) && mob_num1 !== "" && mob_num1 !== null) {
      Toast.show({ text1: "Please enter a valid 10-digit phone number." });
      return;
    } else if (
      mail_Id1 !== "" &&
      mail_Id1 !== null &&
      !emailPattern.test(mail_Id1)
    ) {
      Toast.show({ text1: "Please enter a valid email address." });
      return;
    }
  };

  return (
    <View style={AddContactDetailsStyle.addContactDetailsContainer}>
      {/* Display Contact Details */}
      <Text style={AddContactDetailsStyle.addContactDetailsHeading}>
        Contact Details
      </Text>
      <TextInput
        ref={partyNameEditRef}
        defaultValue={item?.meet_name}
        placeholder="Client Name*"
        maxLength={40}
        multiline={false}
        editable={isPartyEdit}
        value={meet_name}
        onChangeText={(text) => setmeet_name(text)}
        onSubmitEditing={() => handleDonePress(item)}
        returnKeyType="done"
        placeholderTextColor="#C2C2C2"
        style={AddContactDetailsStyle.addContactInputField}
      />
      <View>
        <View style={AddContactDetailsStyle.addMobileNumContainer}>
          <TextInput
            ref={partyMobileEditRef}
            defaultValue={item?.mob_num1}
            value={mob_num1}
            placeholder="Mobile Number"
            keyboardType="numeric"
            maxLength={10}
            multiline={false}
            editable={isPartyEdit}
            onChangeText={(text) => setmob_num1(text)}
            onSubmitEditing={() => handleDonePress(item)}
            returnKeyType="done"
            placeholderTextColor="#C2C2C2"
            style={[AddContactDetailsStyle.addContactInputField, { flex: 1 }]}
          />
          <TouchableOpacity onPress={toggleContactNumberField}>
            <Ionicons
              name={showContactField ? "remove-outline" : "add-outline"}
              color="#7C7C7C"
              size={26}
              style={AddContactDetailsStyle.toggleIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Secondary Mobile Number  */}
        <View
          style={[
            AddContactDetailsStyle.secondaryMobileContainer,
            {
              display: showContactField === true ? "flex" : "none",
            },
          ]}
        >
          <TextInput
            ref={partyMobileEditRef2}
            defaultValue={item?.mob_num2}
            value={mob_num2}
            placeholder="Secondary Mobile Number"
            keyboardType="numeric"
            maxLength={10}
            multiline={false}
            editable={isPartyEdit}
            onChangeText={(text) => setmob_num2(text)}
            onSubmitEditing={() => handleDonePress(item)}
            returnKeyType="done"
            placeholderTextColor="#C2C2C2"
            style={[
              AddContactDetailsStyle.addContactInputField,
              {
                paddingLeft: 8,
                marginRight: 54,
                flex: 1,
              },
            ]}
          />
        </View>
      </View>

      {/* Email Id */}
      <View>
        <View style={AddContactDetailsStyle.addMobileNumContainer}>
          <TextInput
            ref={partyEmailEditRef}
            defaultValue={item?.mail_Id1}
            value={mail_Id1}
            placeholder="Email"
            multiline={false}
            keyboardType="email-address"
            maxLength={40}
            editable={isPartyEdit}
            onChangeText={(text) => setmail_Id1(text)}
            onSubmitEditing={() => handleDonePress(item)}
            returnKeyType="done"
            placeholderTextColor="#C2C2C2"
            style={[AddContactDetailsStyle.addContactInputField, { flex: 1 }]}
          />
          <TouchableOpacity onPress={toggleEmailField}>
            <Ionicons
              name={showEmailField ? "remove-outline" : "add-outline"}
              color="#7C7C7C"
              size={26}
              style={AddContactDetailsStyle.toggleIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Secondary Contact Number  */}
        <View
          style={[
            AddContactDetailsStyle.secondaryMobileContainer,
            {
              display: showEmailField === true ? "flex" : "none",
            },
          ]}
        >
          <TextInput
            ref={partyEmailEditRef2}
            defaultValue={item?.mail_Id2}
            value={mail_Id2}
            placeholder="Secondary Email"
            multiline={false}
            keyboardType="email-address"
            maxLength={40}
            editable={isPartyEdit}
            onChangeText={(text) => setmail_Id2(text)}
            onSubmitEditing={() => handleDonePress(item)}
            returnKeyType="done"
            placeholderTextColor="#C2C2C2"
            style={[
              AddContactDetailsStyle.addContactInputField,
              {
                paddingLeft: 8,
                marginRight: 54,
                flex: 1,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default AddContactDetails;
