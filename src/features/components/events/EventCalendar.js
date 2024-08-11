import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../utils/Locale/LanguageContext";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import BackIconContainer from "../../../common/components/BackIconContainer";
import BackgroundImage from "../../../common/components/BackgroundImage";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";

const EventCalendar = ({ navigation }) => {
  const { strings } = useLanguage();
  const [clientlist, setclientlist] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedClient, setselectedClient] = useState({});
  const [selectedDateTitle, setSelectedDateTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDate, setMarkedDate] = useState("");

  const toggleBottomSheet = () => {
    if (clientlist.length > 1) {
      setBottomSheetVisible(!bottomSheetVisible);
    }
  };

  // Display select date heading - format
  const updatedSelectedDateTitle = (dateString) => {
    const options = { weekday: "short", month: "short", day: "2-digit" };
    const selectedDate = new Date(dateString);
    const formattedDate = selectedDate.toLocaleDateString(undefined, options);
    setSelectedDateTitle(formattedDate);
  };

  useEffect(() => {
    updatedSelectedDateTitle(selectedDate);
  }, [selectedDate]);

  const getWeekday = (day) => {
    const dayOfWeek = day.getDay();
    console.log(day, "check day");
    return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
  };

  const generateWeekDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  // Use generateWeekDates function to get the array of week dates
  const handleDayPress = (day) => {
    if (!getWeekday(new Date(day.dateString))) {
      console.log("");
      const weekStartDate = new Date(day.dateString);
      weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay());
      const weekDates = generateWeekDates(weekStartDate);
      setSelectedDate(day.dateString);
      setMarkedDate(day.dateString);
      navigation.navigate("AddExpense", { weekDates, selectedDateTitle });
    }
  };

  const isWeekday = (day) => {
    const dayOfWeek = new Date(day.timestamp).getDay();
    return dayOfWeek !== 6; // Disable weekdays (Sun: 0, Sat: 6)
  };

  const renderDay = (day) => {
    const isSelected = day.dateString === selectedDate;
    return (
      <Text
        onPress={() => handleDayPress(day)}
        style={[
          SelectWeekEndingDateStyle.dayText,
          isWeekday(day) && SelectWeekEndingDateStyle.disabledDayText,
          isSelected && SelectWeekEndingDateStyle.isSelected,
        ]}
      >
        {day.day}
      </Text>
    );
  };

  return (
    <SafeAreaView style={AddExpenseStyle.addExpenseContainer}>
      <BackIconContainer
        navigation={navigation}
        title={strings.EXPENSE_REPORT}
      />
      <BackgroundImage>
        {/* Client - DropDown  */}
        <TouchableOpacity onPress={toggleBottomSheet}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: PRIMARY_COLORS.PAYREEL_BORDER,
            }}
          >
            <View style={Homescreenstyles.titleContainer}>
              <View style={Homescreenstyles.titleBackg}>
                <TouchableOpacity onPress={toggleBottomSheet}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={Homescreenstyles.title}>
                      {strings.CLIENT}:
                    </Text>
                    <Text style={Homescreenstyles.titleBold}>
                      {"  "}
                      {selectedClient.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleBottomSheet}>
                  {clientlist.length > 1 ? (
                    <Entypo
                      name="chevron-thin-down"
                      color={PRIMARY_COLORS.PAYREEL_ICONS}
                      size={16}
                    />
                  ) : (
                    <View></View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* Select Week Ending Title */}
        <View style={SelectWeekEndingDateStyle.selectWeekEndingContainer}>
          <Text style={SelectWeekEndingDateStyle.selectWeekEndingDate}>
            Select week ending date
          </Text>
        </View>
        {/* Display Calendar Wrapper */}
        <View style={SelectWeekEndingDateStyle.displayCalendarWrapper}>
          {/* Display Selected Date */}
          <View style={SelectWeekEndingDateStyle.selectedDateTitleContainer}>
            <Text style={SelectWeekEndingDateStyle.selectedDateTitle}>
              {selectedDateTitle}
            </Text>
            <MaterialCommunityIcons
              name="pencil-outline"
              color={"green"}
              size={26}
              style={{ marginTop: 10 }}
            />
          </View>
          {/* Display week days with dates */}
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [markedDate]: { selected: true },
            }}
            dayComponent={({ date }) => renderDay(date)}
            hideExtraDays={true}
            renderArrow={(direction) => {
              return (
                <Ionicons
                  name={
                    direction === "left"
                      ? "chevron-back-outline"
                      : "chevron-forward-outline"
                  }
                  size={20}
                  color={"#49454F"}
                />
              );
            }}
            theme={{
              calendarBackground: "grey",
              textDayHeaderFontSize: 16,
              "stylesheet.calendar.header": {
                dayTextAtIndex0: {
                  color: "red", // Sunday
                },
                dayTextAtIndex1: {
                  color: "yellow", // Monday
                },
                dayTextAtIndex2: {
                  color: "red", // Tuesday
                },
                dayTextAtIndex3: {
                  color: "yellow", // Wednesday
                },
                dayTextAtIndex4: {
                  color: "Yellow", // Thursday
                },
                dayTextAtIndex5: {
                  color: "red", // Friday
                },
                dayTextAtIndex6: {
                  color: "#1D1B20", // Saturday
                },
              },
            }}
          />
        </View>
      </BackgroundImage>
    </SafeAreaView>
  );
};
export default EventCalendar;
