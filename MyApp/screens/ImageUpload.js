import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ExpoLinksView } from '@expo/samples';


class ImageUpload extends Component {

    state = {
      image: null,
    };

    render() {
      let { image } = this.state.image;

      return (
        <View style={styles.container}>
        <TouchableOpacity
            style = {styles.submitButton}
            onPress={this._pickImage}>
            <Text style = {styles.submitButtonText}> Choose a Photo </Text>
        </TouchableOpacity>
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      );
    }

    componentDidMount() {
      this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }

    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };
  }



export default ImageUpload

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 15,
        backgroundColor: "#003308"
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
    input:{
        fontFamily: 'Menlo',
        margin: 15,
        height: 40,
        borderColor: 'rgba(252,183,140, 1)',
        borderWidth: 1,
        backgroundColor: 'rgba(252,183,140, 1)',
    },
    getStartedText: {
        fontFamily: 'Menlo',
        fontSize: 17,
        color: 'rgba(252,183,140, 1)',
        lineHeight: 24,
        textAlign: 'center',
    }
});
