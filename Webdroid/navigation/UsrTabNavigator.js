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
import Login from "../screens/Login/LoginScreen";
import QR from "../screens/EventOrgUser/SettingOptions/QR";
import Account from "../screens/EventOrgUser/SettingOptions/ManageAccount";
import Professional from "../screens/EventOrgUser/SettingOptions/ProfessionalProfile";
import CheckedIn from "../screens/EventOrgUser/SettingOptions/CheckedInEvents";
import Checkin from "../screens/EventOrgUser/EventCell/CheckinScreen";
import Favorite from "../screens/EventOrgUser/SettingOptions/FavoriteEvents";
import Interested from "../screens/EventOrgUser/SettingOptions/InterestedEvents";

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
    Setting: {
      screen: UserSetting,
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
    },
    Checkin: {
      screen: Checkin,
      navigationOptions: ({ navigation }) => ({
        headerMode: "screen",
        title: "Check In Here",
        tabBarVisible: false
      })
    },
    account: {
      screen: Account,
      navigationOptions: ({ navigation }) => ({
        headerMode: "screen",
        title: "Account Management",
        tabBarVisible: false
      })
    },
    pro: {
      screen: Professional,
      navigationOptions: ({ navigation }) => ({
        headerMode: "screen",
        title: "Professional Profile",
        tabBarVisible: false
      })
    },
    checked: {
      screen: CheckedIn,
      navigationOptions: ({ navigation }) => ({
        headerMode: "screen",
        title: "Events I Checked In",
        tabBarVisible: false
      })
    },
    favorited: {
      screen: Favorite,
      navigationOptions: ({ navigation }) => ({
        headerMode: "screen",
        title: "Events I Liked",
        tabBarVisible: false
      })
    },
    interested: {
      screen: Interested,
      navigationOptions: ({ navigation }) => ({
        headerMode: "screen",
        title: "Events Interested",
        tabBarVisible: false
      })
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
