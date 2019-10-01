import React from 'react';
import logo from './seaTurtle.svg';
import './App.css';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Button, View, Text } from 'react-native';


const AppContainer = createAppContainer(AppNavigator);

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Tutorial"
                    onPress={() => this.props.navigation.navigate('Tutorial')}
                />
            </View>
        );
    }
}

class TutorialScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Tutorial Screen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Go Back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Tutorial: TutorialScreen,
    },
    {
        initialRouteName: 'Home',
    }
);
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Endangered, the leading app in species checkers!
        </p>
        <p>
          This web app is designed to bring awareness to endangered species. If you would like to see what the status of a species is, you have come to the right place! Head on over to the tutorial page to try it out! If you would like to learn more about the developers of this app, head on over to the about page! Thanks for visiting!
        </p>
        <a
          className="App-link"
          href="https://time.com/4780721/endangered-species-day/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </header>
    </div>
  );
}
*/

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
