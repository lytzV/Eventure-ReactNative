import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import EventList from "../screens/EventOrgUser/EventList";
import OrgList from "../screens/EventOrgUser/OrgList";
import UserSetting from "../screens/EventOrgUser/UserSetting";
import EventDetail from "../screens/EventOrgUser/EventCell/EventCell";

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
    Details: {
      screen: EventDetail,
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
  //tabBarVisible: !(navigation.state.routeName == "Details")
};

EventStack.path = "";

const OrgStack = createStackNavigator(
  {
    Orgs: OrgList
  },
  config
);

OrgStack.navigationOptions = {
  tabBarLabel: "Organizations",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

OrgStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: UserSetting
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Me",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  EventStack,
  OrgStack,
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;

//const AppContainer = createAppContainer(tabNavigator);
/*
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}*/
