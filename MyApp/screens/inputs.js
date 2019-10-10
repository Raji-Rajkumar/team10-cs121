import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

class Inputs extends Component {
	state = {
		common: '',
        scientific: ''
	}
	handleCommon = (text) => {
		this.setState({ common: text })
	}
    handleScientific = (text) => {
        this.setState({ scientific: text })
    }
    submit = (common, scientific) => {
        alert('common name: ' + common + '; scientific name: ' + scientific)
    }
	render() {
		return (
			<View style = {styles.container}>
			    <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "   Common Name"
                    placeholderTextColor = 'rgba(0,110,0,1)'
                    autoCapitalize = "none"
                    onChangeText = {this.handleCommon}/>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "   Scientific Name"
                    placeholderTextColor = 'rgba(0,110,0,1)'
                    autoCapitalize = "none"
                    onChangeText = {this.handleScientific}/>
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.submit(this.state.common, this.state.scientific)
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
		)
	}
}

export default Inputs

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 15,
        backgroundColor: "#004A0C"
    },
    submitButton:{
        backgroundColor: "#FAB64F",
        padding: 10,
        margin: 15,
        height: 40
    },
    submitButtonText:{
        fontFamily: 'Menlo',
        color: 'rgba(0,110,0,1)',
    },
    input:{
        fontFamily: 'Menlo',
        margin: 15,
        height: 40,
        borderColor: "#FAB64F",
        borderWidth: 1,
        backgroundColor: "#FAB64F",
    },
});
