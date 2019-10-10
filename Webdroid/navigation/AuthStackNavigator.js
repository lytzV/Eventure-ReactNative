import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/Register/RegisterScreen";
import SubmitButton from "../screens/Login/SubmitButton";
import EventList from "../screens/EventOrgUser/EventList";
import EventStack from "./MainTabNavigator";
/*const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});*/

const authNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: RegisterScreen,
    //headerMode: 'none',
    navigationOptions: {
      //header: null
    }
  }
});
authNavigator.path = "";
export default authNavigator;
