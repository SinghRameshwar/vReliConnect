import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { newEvent } from "./constants/eventData";
import { realm } from "../stores/DatabaseObj";
import { format } from "date-fns";

const EventListModal = ({
  selectEventMethod,
  dataList,
  setBottomSheetVisible,
  refreshEventList,
  navigation,
}) => {
  const handleItemClick = (item) => {
    selectEventMethod(item);
    setBottomSheetVisible(false);
  };

  const copyEventMethod = () => {
    let eventName = newEvent.name + "-copy" + dataList.length;
    let newEventCreate = {
      ...newEvent,
      name: eventName,
      status: "new_active",
      id: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };
    try {
      realm.write(() => {
        realm.create("Event", newEventCreate, true);
      });
      refreshEventList();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const editEventMethod = (item) => {
    navigation.navigate("EditEventTemplate", { item: item });
    setBottomSheetVisible(false);
  };

  const renderItem = (item) => {
    return (
      <View
        style={{
          backgroundColor: "#262626",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => handleItemClick(item)}
          style={[styles.titleBox, { flex: 1 }]}
        >
          <Text style={styles.titleBold}>{item.name}</Text>
        </TouchableOpacity>
        <Feather
          name="copy"
          color="#747474"
          size={24}
          onPress={() => copyEventMethod()}
        />

        <View
          style={{
            backgroundColor: "#747474",
            width: 1.5,
            height: "40%",
            marginRight: 18,
            marginLeft: 18,
          }}
        />

        <Feather
          name="edit-3"
          color="#747474"
          size={24}
          onPress={() => editEventMethod(item)}
          style={{ marginRight: 24 }}
        />
        <View
          style={{
            backgroundColor: item.status === "active" ? "#95E2B6" : "#DD5F41",
            height: 16,
            width: 16,
            borderRadius: 10,
            marginRight: 16,
          }}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => setBottomSheetVisible(false)}>
      <View style={styles.container}>
        <FlatList
          data={dataList}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    bottom: 86,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  titleBold: {
    marginVertical: 18,
    marginLeft: 16,
    lineHeight: 16,
    fontSize: 14,
    fontWeight: "600",
    color: "#C1C1C1",
  },
});

export default EventListModal;
