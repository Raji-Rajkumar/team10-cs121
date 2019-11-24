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
import { wrap } from 'module';

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
            <Image
            source={
              __DEV__
                ? require('../assets/images/otter.jpg')
                : require('../assets/images/otter.jpg')
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.textHead}>
              Naiti
            </Text>
          <Text style={styles.text}>
            Name: {"\n"}
            School: {"\n"}
            Class: {"\n"}
            Inspiration: {"\n"}
          </Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Image
            source={
              __DEV__
                ? require('../assets/images/raji.jpeg')
                : require('../assets/images/raji.jpeg')
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.textHead}>
              Raji 
          </Text>
          <Text style={styles.text}>
            Name: {"\n"}
            School: {"\n"}
            Class: {"\n"}
            Inspiration: {"\n"}
          </Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Image
            source={
              __DEV__
                ? require('../assets/images/otter.jpg')
                : require('../assets/images/otter.jpg')
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.textHead}>
              Sarah
            </Text>
          <Text style={styles.text}>
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
    flexWrap: wrap,
    flex: 1,
    flexDirection: 'row',
    
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FCB582',
  },
  welcomeImage: {
    width: 200,
    height: 290,
    resizeMode: 'contain',
    marginTop: 2,
  },
  text: {
    fontFamily: 'Menlo',
    fontSize: 17,
    color: '#003308',
    lineHeight: 24,
    textAlign: 'center',
  },
  textHead: {
    fontFamily: 'Menlo',
    fontSize: 24,
    color: '#003308',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
});
