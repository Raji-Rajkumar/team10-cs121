import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import DeveloperScreen from '../screens/DeveloperScreen';

import { MenloText } from '../components/StyledText';

const config = Platform.select({
  web: { headerMode: 'screen'},
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
  tabBarOptions: {
  labelStyle: {
    fontSize: 12,
    color: '#003308',
    fontFamily: 'Menlo',
  },
  style: {
    backgroundColor: 'rgba(252, 183, 140, 1)',
  },
  },
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
  tabBarOptions: {
  labelStyle: {
    fontSize: 12,
    color: '#003308',
    fontFamily: 'Menlo',
  },
  style: {
    backgroundColor: 'rgba(252, 183, 140, 1)',
  },
  },
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
  tabBarOptions: {
  labelStyle: {
    fontSize: 12,
    color: '#003308',
    fontFamily: 'Menlo',
  },
  style: {
    backgroundColor: 'rgba(252, 183, 140, 1)',
  },
  },
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
