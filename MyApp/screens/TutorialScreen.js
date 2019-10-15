import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Inputs from './inputs.js'

export default function TutorialScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>
               Thank you for coming to our page! Type in the name of your animal, and we will give you some information about the animal (source linked from the home page). The way this works is through a query search of a database. Please enter the common name as known in the United States. We do not support any other format, including the scientific name. Happy searching!
          </Text>
        </View>
        <Inputs />
      </ScrollView>
    </View>
  );
}

TutorialScreen.navigationOptions = {
  title: 'Tutorial',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#003308',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontFamily: 'Menlo',
    fontSize: 17,
    color: 'rgba(252, 183, 140, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
