import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import DeveloperScreen from '../screens/DeveloperScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
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

HomeStack.path = '';

const TutorialStack = createStackNavigator(
  {
    Tutorial: TutorialScreen,
  },
  config
);

TutorialStack.navigationOptions = {
  tabBarLabel: 'Tutorial',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'} />
  ),
};

TutorialStack.path = '';

const DeveloperStack = createStackNavigator(
  {
    Developer: DeveloperScreen,
  },
  config
);

DeveloperStack.navigationOptions = {
  tabBarLabel: 'Developers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-woman' : 'md-woman'} />
  ),
};

DeveloperStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  TutorialStack,
  DeveloperStack,
});

tabNavigator.path = '';


export default tabNavigator;
