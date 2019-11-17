import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';

class Inputs extends Component {
	state = {
		common: '',
        scientific: '',
        isReady: false,
        stat: ''
	}
	handleCommon = (text) => {
		this.setState({ common: text })
	}
    handleScientific = (text) => {
        this.setState({ scientific: text })
    } 
    submit = (common, scientific) => {
        // get what the user entered from the URL
        axios.get('http://127.0.0.1:5000/name?common=' + common + '&scientific=' + scientific)
            .then(res => {
                const status = res.data;
                // save it so we can grab it later
                this.setState({ stat: status.status });
                this.setState({ isReady: true });
            })
    }
	render() {
        // set the message
        let message;
        if(this.state.isReady) {
            // only record a message if we have one
            message = this.state.stat;
        }
        else {
            message = "";
        }
        // create two screens, one for uploading, other for results
        // conditional return statement on whether we have results
		return (
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
                <View><Text style = {styles.getStartedText}> {message} </Text></View>
            </View>
		)
	}
}

export default Inputs

const styles = StyleSheet.create({
    inputContainer:{
        flex: 1,
        paddingTop: 15,
        backgroundColor: "#003308"
    },
    inputButton:{
        backgroundColor: 'rgba(252,183,140, 1)',
        padding: 10,
        margin: 15,
        height: 40
    },
    inputButtonText:{
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
