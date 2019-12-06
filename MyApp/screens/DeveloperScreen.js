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
 
  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.rowContainer}>
          <View style={styles.welcomeContainer}>
            <Image
            source={
              __DEV__
                ? require('../assets/images/naiti.jpg')
                : require('../assets/images/naiti.jpg')
            }
            style={styles.welcomeImage}
          />
         
          <Text style={styles.textHead}>
              Naiti Bhatt
            </Text>
          <Text style={styles.text}>
            Naiti is a Scripps College junior. She is excited about 'Endangered?' because it helped her learn new ways of 
            developing and refined her knowledge of using machine learning in a practical scenario. 
            She cannot wait to try it out by uploading some pictures and seeing what happens after her next hike!
          </Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Image
            source={
              __DEV__
                ? require('../assets/images/raji.jpg')
                : require('../assets/images/raji.jpg')
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.textHead}>
              Raji Rajkumar
          </Text>
          <Text style={styles.text}>
            Raji is a junior at Scripps College. She created 'Endangered?' because it
            was a perfect way to explore her interests in machine learning and web development 
            while still contributing to a project with impact. 
          </Text>
          </View>

          <View style={styles.welcomeContainer}>
            <Image
            source={
              __DEV__
                ? require('../assets/images/sarah.jpeg')
                : require('../assets/images/sarah.jpeg')
            }
            style={styles.welcomeImage}
          />
          <Text style={styles.textHead}>
              Sarah Grade
          </Text>
          <Text style={styles.text}>
            Sarah is a Harvey Mudd junior. She is passionate about 'Endangered?' because  
            of the opportunities its development provided for learning new libraries and debugging
            tools. She was inspired by her previous environmental science classes and interest
            in machine learning.
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
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#003308',
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: '#003308',
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FCB582',
    height: 650,
    width: 250,
    
  },
  welcomeImage: {
    width: 210,
    height: 300,
    resizeMode: 'contain',
    marginTop: 2,
  },
  text: {
    fontFamily: 'Menlo',
    fontSize: 14,
    color: '#003308',
    lineHeight: 24,
    textAlign: 'center',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
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
