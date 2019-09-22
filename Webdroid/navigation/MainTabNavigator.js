import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import EventList from '../screens/EventOrgUser/EventList';
import OrgList from '../screens/EventOrgUser/OrgList';
import UserSetting from '../screens/EventOrgUser/UserSetting';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const EventStack = createStackNavigator(
  {
    Events: EventList,
  },
  config
);

EventStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

EventStack.path = '';

const OrgStack = createStackNavigator(
  {
    Orgs: OrgList,
  },
  config
);

OrgStack.navigationOptions = {
  tabBarLabel: 'Organizations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

OrgStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: UserSetting,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Me',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  EventStack,
  OrgStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;