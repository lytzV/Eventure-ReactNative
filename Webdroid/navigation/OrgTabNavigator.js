import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import EventList from "../screens/Org/OrgEventList";
import OrgSetting from "../screens/Org/OrgSetting";
import EventDetail from "../screens/EventOrgUser/EventCell/EventCell";
import QR from "../screens/EventOrgUser/QR";
import Editor from "../screens/Org/Editor";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const EventStack = createStackNavigator(
  {
    List: {
      screen: EventList,
      navigationOptions: {
        title: "Events"
      }
    },
    Edit: {
      screen: Editor,
      navigationOptions: ({ navigation }) => ({
        headerMode: "screen",
        title: navigation.state.params.Title
      })
    }
  },
  {
    initialRouteName: "List"
  },
  config
);

EventStack.navigationOptions = {
  tabBarLabel: "Events",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};
EventStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Setting: {
      screen: OrgSetting,
      navigationOptions: {
        title: "Me",
        tabBarVisible: true
      }
    },
    QR: {
      screen: QR,
      navigationOptions: {
        headerMode: "screen",
        title: "Scan QR Code",
        tabBarVisible: false
      }
    }
  },
  config
);

SettingsStack.navigationOptions = ({ navigation }) => ({
  //tabBarVisible:
  //navigation.state.routes[navigation.state.index] == "QR" ? false : true,
  tabBarLabel: "Me",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
});
SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  EventStack,
  SettingsStack
});
tabNavigator.path = "";

export default tabNavigator;
