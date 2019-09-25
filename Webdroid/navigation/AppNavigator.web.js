import { createBrowserApp } from "@react-navigation/web";
import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const switchNavigator = createSwitchNavigator({
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      Auth: AuthStackNavigator
    },
    {
      initialRouteName: "Main"
    }
  )

});
switchNavigator.path = "";

export default createBrowserApp(switchNavigator, { history: "hash" });
