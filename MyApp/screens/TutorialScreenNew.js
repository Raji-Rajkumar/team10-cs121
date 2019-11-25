
import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'
import * as tf from '@tensorflow/tfjs'
import {fetch} from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as jpeg from 'jpeg-js'

import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { ExpoLinksView } from '@expo/samples';
import { MenloText } from '../components/StyledText';
import axios from 'axios';

//const model_url = '../vgg19_model/model.json';



export default class TutorialScreenNew extends Component {

  static navigationOptions = ({ navigation }) => {
    const {params} = navigation.state;
    return params;
  };

  
  state = {
    isModelReady: false,
    isStatusReady: false,
    image: null,
    predictions: null,
    common: null,
    scientific: null,
    stat: null,
    isTfReady: false,
    isPhase2Hit: false,
  }

  // FROM IMAGE UPLOAD AND CLASSIFY CLASS

  async componentDidMount() {

    this.props.navigation.setParams({
      title: "Upload Image", 
      headerStyle: {backgroundColor: '#003308'},
      headerTitleStyle: {fontFamily: 'Menlo', fontSize: 25, color: 'rgba(252, 183, 140, 1)'},
    });
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
    
  componentDidUpdate(prevProps, prevState) {
    if (this.state.predictions != prevState.prediction && this.state.isStatusReady == prevState.isStatusReady && this.state.isPhase2Hit == false) {
      this.props.navigation.setParams({title: 'Enter Name'});
      this.state.isPhase2Hit = true;
    }
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
    console.log('hit');
    console.log(prediction);
    var commonStr = '';
    var sciStr = '';
    var names = prediction.className.split(',');
    var probStr = prediction.probability.toFixed(3);
    commonStr = names[0];
    var sciName = '';
    if (names.length == 2) {
        sciStr = names[1];
    }
    if (sciStr != '') {
        sciName = ' Scientific Name:' + sciStr + ',';
    }
    return (
      <View style={styles.predictionItem}>
      <Text style={styles.predictionText}>
        Common Name: {commonStr},{sciName} Confidence: {probStr}
      </Text>
      <TouchableOpacity
        style = {styles.inputButton}
        onPress = {
          () => this.submit(commonStr, sciStr)
        }>
        <Text style = {styles.inputButtonText}> Get Status </Text>
      </TouchableOpacity>
      </View>
    )
  }
    /*
      <TouchableOpacity
        style = {styles.inputButton}
        onPress = {
          () => this.submit(commonStr, sciStr)
        }>
        <Text style = {styles.inputButtonText}> Get Status </Text>
      </TouchableOpacity>
      */

  // BELOW IS FROM INPUTS.JS

	handleCommon = (text) => {
		this.setState({ common: text })
	}
  handleScientific = (text) => {
      this.setState({ scientific: text })
  } 
  submit = (common, scientific) => {
    // get what the user entered from the URL
    console.log("common: " + common + " scientific: " + scientific);

    axios.get('http://127.0.0.1:5000/name?common=' + common + '&scientific=' + scientific)
      .then(res => {
        const status = res.data;
        // save it so we can grab it later
        this.setState({ stat: status.status });
        this.setState({ isStatusReady: true });
        this.props.navigation.setParams({title: 'Results!'});
      })
  }
  handleRender = () => {
    // handle onPress of the reclassify button by resetting initial states
    this.setState({ predictions: null });
    this.setState({ isStatusReady: false });
    this.setState({ image: null });
    this.setState({ common: null });
    this.setState({ scientific: null });
    this.setState({ stat: null });
    this.setState({ isTfReady: false });
    this.setState({isPhase2Hit: false});
    this.props.navigation.setParams({title: 'Upload Image'});
  }

  render() {
      // by default, have the tutorial text and the upload image box
    let {  isTfReady, isModelReady, predictions, image, common, scientific, isStatusReady, stat  } = this.state;
    // set the message
    let message;
    if(isStatusReady) {
        // only record a message if we have one
        message = stat;
    }
    else {
        message = "";
    }
    return (
      <View style={{flex:1}}>
      <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
       
        {!predictions && !isStatusReady && (
          <View style={styles.container}>
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}>
                Thank you for using "Endangered?".
                Upload an image of an animal below to get started with your search! 
                Our image classifer (MobileNet) will classify the image as whatever animal it is! 
                Please note that this app is meant for animals only; upload appropriate images, and no images of humans. The classifier will report its top three predictions.
                Happy searching!


              </Text>
            </View>
            <View style={styles.imageContainer1}>
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
              </View>
            </View>
          </View>
        )}
        {predictions && !isStatusReady && (
          <View style={styles.container}>
            
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}>
                The top three predictions of your image are below. Enter one of those predictions into the appropriate search bar. Our application will then search through a database (linked in the home page) for the name entered and report its status. 
              </Text>
            </View>
            <View style={styles.imageContainer1}>
              <StatusBar barStyle='dark-content' />
              <TouchableOpacity
                style = {styles.imageButton}
                onPress={isModelReady ? this.pickAndClassifyImage : undefined}>
                {image &&
                  <Image source={ image } style={styles.imageContainer} />}
              </TouchableOpacity>

              <View style={styles.predictionWrapper}>
                {isModelReady &&
                    predictions.map(p => this.renderPrediction(p))}
            </View>
          </View>
        </View>
        )}
        {predictions && isStatusReady && (
          <View style={styles.container}>
          <View style={styles.imageContainer1}>
            <StatusBar barStyle='dark-content' />
            <TouchableOpacity
              style = {styles.imageButton}
              onPress={isModelReady ? this.pickAndClassifyImage : undefined}>
              {image &&
                <Image source={ image } style={styles.imageContainer} />}
            </TouchableOpacity> 
          </View>
          <View><Text style = {styles.getStartedText}> {message} </Text></View>
            <TouchableOpacity
                style = {styles.reclassifyButton}
                onPress = {
                    () => this.handleRender()
                }>
                <Text style = {styles.inputButtonText}> Upload Another Image </Text>
            </TouchableOpacity>
          </View>
        )} 
        
      </ScrollView>
      </View>
    );
  }
  
}
/*
          <View style = {styles.inputContainer}>
			      <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "  Common Name"
              placeholderTextColor = '#003308'
              autoCapitalize = "none"
              onChangeText = {this.handleCommon}/>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "  Scientific Name"
              placeholderTextColor = '#003308'
              autoCapitalize = "none"
              onChangeText = {this.handleScientific}/>
            <TouchableOpacity
              style = {styles.inputButton}
              onPress = {
                () => this.submit(this.state.common, this.state.scientific)
              }>
              <Text style = {styles.inputButtonText}> Submit </Text>
            </TouchableOpacity>
          </View>
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#003308',
  },
  imageContainer1: {
      flex: 1,
      backgroundColor: "#003308",
      justifyContent: 'center',
      alignItems: 'center'
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: '#003308',
  },
  submitButtonText:{
      fontFamily: 'Menlo',
      color: '#003308',
  },
  getStartedContainer: {
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 25,
    backgroundColor: '#003308',
  },
  getStartedText: {
    fontFamily: 'Menlo',
    fontSize: 17,
    color: 'rgba(252, 183, 140, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  predictionText: {
    fontFamily: 'Menlo',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgba(252, 183, 140, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  loadingModelContainer: {
     flexDirection: 'row',
     marginTop: 10
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
  predictionWrapper: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: '#003308'
  },
  inputContainer:{
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#003308"
  },
  inputButton:{
    backgroundColor: 'rgba(252,183,140, 1)',
    padding: 10,
    margin: 15,
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputButtonText:{
    fontFamily: 'Menlo',
    color: '#003308',
    textAlign: 'center',
  },
  reclassifyButton:{
    backgroundColor: 'rgba(252, 183, 140, 1)',
    padding: 10,
    marginLeft: '35%',
    marginRight: '35%',
    marginTop: 15,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  input:{
    fontFamily: 'Menlo',
    margin: 15,
    height: 40,
    borderColor: 'rgba(252,183,140, 1)',
    borderWidth: 1,
    backgroundColor: 'rgba(252,183,140, 1)',
  },
  predictionItem:{
    justifyContent: 'center',
    alignItems: 'center',
  }
});

