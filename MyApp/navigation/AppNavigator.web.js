import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import ResultsScreen from '../screens/ResultsScreen';

import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Results: ResultsScreen
},
{
  initialRouteName: 'Main',
}
);
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
