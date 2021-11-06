import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Alert, View, Text, Button, TextInput } from 'react-native';
import signUp from './signUp'
import base64 from 'base-64'


const url = "http://cs571.cs.wisc.edu:5000/login/"

export default function home({ navigation }) {
	const [username, setUser] = React.useState("Username")
	const [password, setPass] = React.useState("Password")
	const [userData, setData] = React.useState("None")
	const [token, setToken] = React.useState(" ")


	const signUpPage = () => {
		navigation.navigate("SignUp")
	}

	async function getToken() {
		const data = "Basic " + base64.encode(username + ":" + password)
		let token = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': data,
			}

		}).then(response => response.json())
		let dataURL = 'http://cs571.cs.wisc.edu:5000/users/' + username
		let prevData = await fetch(dataURL, {
			method: 'GET',
			headers: {
				'x-access-token': token.token
			}
		}).then(prevData => prevData.json())
			.catch(error => {
				console.error("Error" + error)
			})
		login(token, prevData)
	}

	function login(token, prevData) {
		if (token.message) {
			Alert.alert(
				"Attention!",
				"Invalid Username or Password!",
				[
					{
						text: "Cancel",
						style: "cancel"
					},
					{ text: "OK" }
				]
			)
		} else if(prevData.message) {
			Alert.alert(
				"Attention!",
				prevData.message,
				[
					{
						text: "Cancel",
						style: "cancel"
					},
					{ text: "OK" }
				]
			)
		}else {
			navigation.navigate("Profile", { idToken: token.token, prevData: prevData, username: username })
		}
	}


	return (<View style={styles.container}>
		<Text style={styles.title}>Fitness Tracker</Text>
		<Text style={styles.lead}>Welcome to the Fitness App!</Text>
		<TextInput onChangeText={setUser} style={styles.input} placeholder="Username" />
		<TextInput onChangeText={setPass} style={styles.input} placeholder="Password" />
		<Button title="Login" color="black" onPress={getToken} />
		<Button title="Sign up" color="red" onPress={signUpPage} />
		<StatusBar style="auto" />
	</View>);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		color: '#00FF00',
		backgroundColor: 'red',
	},
	input: {
		marginTop: 15,
		borderWidth: 5,
		borderColor: 'red',
		height: 50,
		width: 300,
		fontSize: 25,
	},
	title: {
		color: 'red',
		fontSize: 50,
	},
	lead: {
		color: 'red',
		fontSize: 25,
	}
});