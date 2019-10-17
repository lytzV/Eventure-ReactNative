import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./UsrTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import OrgTabNavigator from "./OrgTabNavigator";

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      Auth: AuthStackNavigator,
      Org: OrgTabNavigator
    },
    {
      initialRouteName: "Main"
    }
  )
);
