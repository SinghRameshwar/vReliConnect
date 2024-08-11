/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Toast from "react-native-toast-message";
import RootNavigation from "./src/navigator/RootNavigation";

function App() {
  // const isDarkMode = useColorScheme() === "dark";

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <SafeAreaView style={{ backgroundColor:'black', flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor='black'
      />
      <RootNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

export default App;
