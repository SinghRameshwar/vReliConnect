import { View, ScrollView, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ClientContactList = ({ clientList, currentView, setcurrentView }) => {
  return (
    <View style={{ backgroundColor: "#262626" }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {clientList.map((item, index) => {
          //clientList.length > 1 &&
          return (
            <TouchableOpacity onPress={() => setcurrentView(clientList[index])}>
              <View
                style={{
                  width: 200,
                  backgroundColor: "#353535",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  marginTop: 16,
                  marginBottom: 16,
                  marginLeft: 5,
                  marginRight: 5,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={require("../../assets/images/user_img.png")}
                  style={{ height: 38, width: 38 }}
                />
                <Text
                  style={{ color: "white", marginLeft: 10, flex: 1 }}
                  numberOfLines={1}
                >
                  {item.meet_name === "" ? "Default" : item.meet_name}
                </Text>

                <Image
                  source={require("../../assets/images/user_img.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ClientContactList;
