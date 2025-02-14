import * as WebBrowser from 'expo-web-browser';
import React, { Component} from 'react';
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

export default class HomeScreen extends Component{
  render() {
  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style = {styles.rowContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/otter.jpg')
                : require('../assets/images/otter.jpg')
            }
            style={styles.welcomeImage}
          />
        </View>
        <View style = {styles.welcomeContainer}>
            <Image
                source={
                    __DEV__
                    ? require('../assets/images/seaTurtle.jpg')
                    : require('../assets/images/seaTurtle.jpg')
                }
                style = {styles.welcomeImage}
            />
        </View>
        <View style = {styles.welcomeContainer}>
            <Image
                source={
                    __DEV__
                    ? require('../assets/images/polarBears.jpg')
                    : require('../assets/images/polarBears.jpg')
                }
                style = {styles.welcomeImage}
            />
        </View>
        </View>
        <View style={styles.getStartedContainer}>

          <Text style={styles.getStartedText}>Endangered?</Text>


          <Text style={styles.getStartedText}>
            Welcome! Here, you can find out if an animal is endangered or not.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Source of Database of Mammal Info
            </Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.rowContainer}>
        <View style = {styles.welcomeContainer}>
            <Image
                source={
                    __DEV__
                    ? require('../assets/images/giantPanda.jpg')
                    : require('../assets/images/giantPanda.jpg')
                }
                style = {styles.welcomeImage}
            />
        </View>
        <View style = {styles.welcomeContainer}>
            <Image
                source={
                    __DEV__
                    ? require('../assets/images/leopard.jpg')
                    : require('../assets/images/leopard.jpg')
                }
                style = {styles.welcomeImage}
            />
        </View>

        <View style = {styles.welcomeContainer}>
            <Image
                source={
                    __DEV__
                    ? require('../assets/images/elephant.jpg')
                    : require('../assets/images/elephant.jpg')
                }
                style = {styles.welcomeImage}
            />
        </View>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.bottomText}>
          To get started with searching for your animal's conservation status, head to Find Status!
        </Text>

      </View>
    </View>
  );
 }

}

HomeScreen.navigationOptions = {
  header: null,
};



function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://ecos.fws.gov/ecp/report/ad-hoc-creator?catalogId=species&reportId=species&columns=%2Fspecies@cn,sn,status,desc,listing_date&sort=%2Fspecies@cn%20asc;%2Fspecies@sn%20asc'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: '#003308',
  },
  developmentModeText: {
    fontFamily: 'Menlo',
    marginBottom: 20,
    color: 'rgba(252,183,140, 1)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  bottomText: {
    fontFamily: 'Menlo',
    fontSize: 17,
    color: '#003308',
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
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginTop: 2,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 50,
  },
    getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontFamily: 'Menlo',
    fontSize: 17,
    color: '#FCB582',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'white',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#FCB582',
    paddingVertical: 20,
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
    color: '#c0e4fd',
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap', 
  }
});
