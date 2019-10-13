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
        axios.get('http://127.0.0.1:5000/name?common=' + common + '&scientific=' + scientific)
            .then(res => {
                const status = res.data;
                this.setState({ stat: status.status });
                this.setState({ isReady: true });
            })
    }
	render() {
        // set the message
        
        let message;
        if(this.state.isReady) {
            message = this.state.stat;
        }
        else {
            message = "";
        }
        
		return (
			<View style = {styles.container}>
			    <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "  Common Name"
                    placeholderTextColor = '#004A0C'
                    autoCapitalize = "none"
                    onChangeText = {this.handleCommon}/>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "  Scientific Name"
                    placeholderTextColor = '#004A0C'
                    autoCapitalize = "none"
                    onChangeText = {this.handleScientific}/>
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.submit(this.state.common, this.state.scientific)
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
                <View><Text style = {styles.getStartedText}> {message} </Text></View>
            </View>
		)
	}
}

export default Inputs

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 15,
        backgroundColor: "#003308"
    },
    submitButton:{
        backgroundColor: 'rgba(252,183,140, 1)',
        padding: 10,
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
