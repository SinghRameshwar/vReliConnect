import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../../SplashScreen";
import ProfileViewMessageModal from "../templateScreens/ProfileViewMessageModal";
import QrCodeScannerTest from "../templateScreens/QrCodeScannerTest";
import ProfileTemplate from "../templateScreens/ProfileTemplate";
import UserProfileInfo from "../features/components/manage/ManageProfile";
import HomeContainer from "../features/components/homescreen/HomescreenContainer";
import QRimage from "../templateScreens/QRimage";
import EditEventTemplate from "../templateScreens/EditEventTemplate";
import BackIconContainer from "../common/components/BackIconContainer";
import CopyEventName from "../features/components/events/CopyEventName";
import DefaultEvents from "../features/components/events/DefaultEvents";
import ActiveEventName from "../features/components/logs/ActiveEventName";
import EditEventName from "../features/components/events/EditEventName";
import EventListView from "../features/components/events/EventListView";
import RemoveEvent from "../features/components/events/RemoveEvent";
import CloseEvent from "../features/components/events/CloseEvent";

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CloseEvent"
          component={CloseEvent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EventListView"
          component={EventListView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RemoveEvent"
          component={RemoveEvent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditEventName"
          component={EditEventName}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BackIconContainer"
          component={BackIconContainer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeContainer"
          component={HomeContainer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DefaultEvents"
          component={DefaultEvents}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CopyEventName"
          component={CopyEventName}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ActiveEventName"
          component={ActiveEventName}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditEventTemplate"
          component={EditEventTemplate}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileViewMessageModal"
          component={ProfileViewMessageModal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="QrCodeScannerTest"
          component={QrCodeScannerTest}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileTemplate"
          component={ProfileTemplate}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserProfileInfo"
          component={UserProfileInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="QRimage"
          component={QRimage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
