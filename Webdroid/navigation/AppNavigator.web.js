import { createBrowserApp } from "@react-navigation/web";
import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./UsrTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import OrgTabNavigator from "./OrgTabNavigator";

const switchNavigator = createSwitchNavigatorcreateSwitchNavigator(
  {
    Main: MainTabNavigator,
    Auth: AuthStackNavigator,
    Org: OrgTabNavigator
  },
  {
    initialRouteName: "Main"
  }
);
switchNavigator.path = "";

export default createBrowserApp(switchNavigator, { history: "hash" });
