import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Inputs from './inputs.js'
import ImageUpload from './ImageUpload.js'


import { MenloText } from '../components/StyledText';

export default function TutorialScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>

               Thank you for coming to our page!
               Type in the name of your animal, and we will give you some information about the animal (source linked from the home page).
               The way this works is through a query search of a database. Please enter the common name as known in the United States. We do not support any other format, including the scientific name.
               Happy searching!

          </Text>
        </View>
        <Inputs />

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>

                You can also upload an image of your animal!

          </Text>
          <ImageUpload />
        </View>
      </ScrollView>
    </View>
  );
}

TutorialScreen.navigationOptions = {
  title: 'Tutorial',
  headerStyle: {
      backgroundColor: '#003308',
    },
  headerTitleStyle: {fontFamily: 'Menlo', fontSize: 25, color: 'rgba(252, 183, 140, 1)'},
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 100,
    backgroundColor: '#003308',
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: '#003308',
  },
  submitButton:{
      backgroundColor: 'rgba(252,183,140, 1)',
      padding: 5,
      margin: 15,
      height: 40
  },
  submitButtonText:{
      fontFamily: 'Menlo',
      color: '#003308',
  },
  getStartedContainer: {
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 50,
    backgroundColor: '#003308',
  },
  getStartedText: {
    fontFamily: 'Menlo',
    fontSize: 17,
    color: 'rgba(252, 183, 140, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
