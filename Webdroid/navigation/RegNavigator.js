import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import RegisterScreen from "../screens/RegisterScreen";

const regNavigator = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
});
regNavigator.path = "";
export default regNavigator;
