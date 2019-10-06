import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

class Inputs extends Component {
	state = {
		animal: ''
	}
	handleAnimal = (text) => {
		this.setState({ animal: text })
	}
    submit = (animal) => {
        alert('you entered: ' + animal)
    }
	render() {
		return (
			<View style = {styles.container}>
			    <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "   Animal"
                    placeholderTextColor = 'rgba(0,110,0,1)'
                    autoCapitalize = "none"
                    onChangeText = {this.handleAnimal}/>
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.submit(this.state.animal)
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
        color: 'rgba(0,110,0,1)',
    },
    input:{
        margin: 15,
        height: 40,
        borderColor: "#FAB64F",
        borderWidth: 1,
        backgroundColor: "#FAB64F",
    },
});
