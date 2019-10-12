import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import { getJSONRepos } from './exports.js';

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
        getJSONRepos(common)
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:5000/result')
            .then(res => {
                const status = res.data;
                console.log(res.data);
            })
    }
	render() {
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
        backgroundColor: 'rgba(252,183,140, 1)',
        padding: 10,
        margin: 15,
        height: 40
    },
    submitButtonText:{
        fontFamily: 'Menlo',
        color: '#004A0C',
    },
    input:{
        fontFamily: 'Menlo',
        margin: 15,
        height: 40,
        borderColor: 'rgba(252,183,140, 1)',
        borderWidth: 1,
        backgroundColor: 'rgba(252,183,140, 1)',
    },
});
