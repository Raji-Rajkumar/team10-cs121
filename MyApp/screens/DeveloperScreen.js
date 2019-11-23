import * as WebBrowser from 'expo-web-browser';
import React, { Component} from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MenloText } from '../components/StyledText';

export default class DeveloperScreen extends Component{
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  // return <ExpoConfigView />; //this is how you get info about the app
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.rowContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.getStartedText}>
              Raji
            </Text>
            <Image
            source={
              __DEV__
                ? require('../assets/images/otter.jpg')
                : require('../assets/images/otter.jpg')
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.getStartedText}>
            Name: {"\n"}
            School: {"\n"}
            Class: {"\n"}
            Inspiration: {"\n"}
          </Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.getStartedText}>
              Raji
            </Text>
            <Image
            source={
              __DEV__
                ? require('../assets/images/raji.jpeg')
                : require('../assets/images/raji.jpeg')
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.getStartedText}>
            Name: {"\n"}
            School: {"\n"}
            Class: {"\n"}
            Inspiration: {"\n"}
          </Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.getStartedText}>
              Raji
            </Text>
            <Image
            source={
              __DEV__
                ? require('../assets/images/otter.jpg')
                : require('../assets/images/otter.jpg')
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.getStartedText}>
            Name: {"\n"}
            School: {"\n"}
            Class: {"\n"}
            Inspiration: {"\n"}
          </Text>
          </View>
        </View>
        </ScrollView>
      </View>
    );
   }
}

DeveloperScreen.navigationOptions = {
  title: 'About Us',
  headerStyle: {backgroundColor: '#003308'},
  headerTitleStyle: {fontFamily: 'Menlo', fontSize: 25, color: 'rgba(252, 183, 140, 1)'},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom:30,
    backgroundColor: '#003308',
  },
  contentContainer: {
    paddingTop: 30,
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
    
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
    marginTop: 2,
  },
  getStartedText: {
    fontFamily: 'Menlo',
    fontSize: 17,
    color: '#FCB582',
    lineHeight: 24,
    textAlign: 'center',
  },
});
