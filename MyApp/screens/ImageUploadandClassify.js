import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import * as tf from '@tensorflow/tfjs'
import {fetch} from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as jpeg from 'jpeg-js'
import * as WebBrowser from 'expo-web-browser';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { ExpoLinksView } from '@expo/samples';

// set this to the resnet or vgg model when using it
//const model_url = '../resnet_model/model.json'

class ImageUploadandClassify extends Component {

    state = {
        isTfReady: false,
        isModelReady: false,
        predictions: null,
        image: null,
    };

    async componentDidMount() {
      // waits for tensorflowjs to be loaded and ready
      await tf.ready()
      this.setState({
        isTfReady: true
      })
      // loads mobilenet model for use
      this.model = await mobilenet.load()

      // the below code is for using the resnet or vgg model
      //this.model = await tf.loadLayersModel(model_url, {credentials: 'include'})
      this.setState({ isModelReady: true })
      this.getPermissionAsync()
    }

    // need to get permission to access the camera roll for ios
    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }

    // converts raw image data to usable 3d tensor
    // need to look into it more, but there's a function decodeJpeg() in tfjs-react-native that does this
    imageToTensor(rawImageData) {
      const TO_UINT8ARRAY = true
      const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
      // Drop the alpha channel info for mobilenet
      const buffer = new Uint8Array(width * height * 3)
      let offset = 0 // offset into original data
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset]
        buffer[i + 1] = data[offset + 1]
        buffer[i + 2] = data[offset + 2]

        offset += 4
      }

      return tf.tensor3d(buffer, [height, width, 3])
    }

    // takes the image uri, width, and height as raw data and converts it to a 3D tensor and uses the model to classify
    classifyImage = async () => {
      try {
        //const imageAssetPath = Image.resolveAssetSource(this.state.image) // this function only works for mobile!
        console.log(this.state.image)
        const source = {uri: this.state.image.uri}
        const response = await fetch(source.uri, {}, { isBinary: true })
        const rawImageData = await response.arrayBuffer()

        // convert uri, width, height to usable 3d tensor
        const imageTensor = this.imageToTensor(rawImageData)

        // use model to predict and store result in predictions
        const predictions = await this.model.classify(imageTensor)

        // stores predictions in state
        this.setState({ predictions })
        // log so we can see what is going on!
        console.log(predictions)
      } catch (error) {
        console.log(error) // if something goes wrong here, catch it and tell us!
      }
    }



    // allows user to select the image from the camera roll
    pickAndClassifyImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3]
          })

          console.log(result)

          if (!result.cancelled) {
            const source = {uri: result.uri}
            this.setState({ image: source})
            this.classifyImage()
          }
        } catch (error) {
          console.log(error) // ensures that we catch and log errors as they happen so we can fix them
        }
    }

    // puts the prediction in a nice pretty form to list and show users
    renderPrediction = prediction => {
      return (
        <Text key={prediction.className} style={styles.getStartedText}>
          {prediction.className}
        </Text>
      )
    }



    render() {
      let {  isTfReady, isModelReady, predictions, image  } = this.state;

      return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <TouchableOpacity
                style = {styles.imageButton}
                onPress={isModelReady ? this.pickAndClassifyImage : undefined}>
                {image &&
                  <Image source={ image } style={styles.imageContainer} />}
                <View style={styles.loadingModelContainer}>
                {isModelReady && !image && (
                  <Text style={styles.submitButtonText}>Choose a Photo </Text>
              )}
              {!isModelReady && !image && (
                <ActivityIndicator size='large' />
                )}
                </View>
            </TouchableOpacity>

            <View style={styles.predictionWrapper}>
            {isModelReady && image && (
              <Text style={styles.getStartedText}>
                Predictions: {predictions ? '' : 'Predicting...'}
              </Text>
            )}
            {isModelReady &&
              predictions &&
              predictions.map(p => this.renderPrediction(p))}
          </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#003308"
    },
    loadingModelContainer: {
      flexDirection: 'row',
      marginTop: 10
    },
    imageButton:{
        backgroundColor: 'rgba(252,183,140, 1)',
        borderColor: 'rgba(252,183,140, 1)',
        borderWidth: 5,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 40,
        marginBottom: 10,
        height: 280,
        width: 280
    },
    imageContainer: {
      width: 250,
      height: 250,
      position: 'absolute',
      top: 10,
      left: 10,
      bottom: 10,
      right: 10
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
    predictionWrapper: {
      height: 100,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 5,
      backgroundColor: "#003308"
    },
    getStartedText: {
        fontFamily: 'Menlo',
        fontSize: 17,
        color: 'rgba(252,183,140, 1)',
        lineHeight: 24,
        textAlign: 'center',
    }
})

export default ImageUploadandClassify
