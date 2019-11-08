import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Inputs from './inputs.js'
import ImageUpload from './ImageUpload.js'


import { MenloText } from '../components/StyledText';

export default function ResultsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/seaTurtle.jpg')
                : require('../assets/images/seaTurtle.jpg')
            }
            style={styles.welcomeImage}
          />
        </View>

      </ScrollView>

    </View>
  );
}

ResultsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004A0C',
  },
  developmentModeText: {
    fontFamily: 'Menlo',
    marginBottom: 20,
    color: 'rgba(252,183,140, 1)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(2,74,16,1)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontFamily: 'Menlo',
    fontSize: 17,
    color: 'rgba(252,183,140, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoText: {
    fontFamily: 'Menlo',
    fontSize: 17,
    color: 'rgba(252,183,140, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontFamily: 'Menlo',
    fontSize: 14,
    color: '#FCB582',
  },
});
