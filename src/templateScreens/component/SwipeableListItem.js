// SwipeableListItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-swipeable";

const SwipeableListItem = ({
  item,
  onDelete,
  onArchive,
  onItemPress,
  onWrap,
}) => {
  const rightButtons = [
    <TouchableOpacity
      key="flush"
      style={styles.button}
      onPress={() => onDelete(item.id)}
    >
      <Text style={styles.buttonText}> Flush </Text>
    </TouchableOpacity>,
    <TouchableOpacity
      key="wrap"
      style={styles.button}
      onPress={() => onWrap(item)}
    >
      <Text style={styles.buttonText}> Wrap </Text>
    </TouchableOpacity>,
  ];

  const handleItemPress = () => {
    onItemPress(item);
  };
  return (
    <View>
      <Swipeable rightButtons={rightButtons}>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            marginHorizontal: 20,
            marginTop: 20,
          }}
          onPress={handleItemPress}
        >
          <View style={styles.container}>
            <Text style={{ fontSize: 18, color: "grey" }}>Event Name :</Text>
            <Text
              style={{
                color: "#254156",
                fontSize: 16,
                marginTop: 2,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: "grey",
                    marginTop: 15,
                  }}
                >
                  Date :{" "}
                </Text>
                <Text
                  style={{
                    color: "#254156",
                    fontSize: 16,
                    marginTop: 2,
                    fontWeight: "bold",
                  }}
                >
                  {item.start_dt}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{ fontSize: 18, color: "grey" }}>Status</Text>
                <Text
                  style={[
                    styles.statusText,
                    { color: item?.status === "active" ? "green" : "black" }, // Corrected
                    item?.status === "closed" && styles.closedStatus,
                  ]}
                >
                  {item?.status
                    ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                    : ""}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
      <View
        style={{
          height: 1,
          backgroundColor: "grey",
          marginLeft: 16,
          marginRight: 16,
          marginTop: 10,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  titleBold: {
    marginVertical: 12,
    fontFamily: "Open-Sans",
    fontSize: 16,
    fontWeight: "800",
    color: "#365e7d",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Arial",
    color: "#254156",
    fontWeight: "bold",
  },
  statusText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  closedStatus: {
    color: "red",
  },
});

export default SwipeableListItem;
