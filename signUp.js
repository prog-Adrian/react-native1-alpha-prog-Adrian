import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Alert, Text, View, Button, TextInput } from 'react-native';

const url = 'http://cs571.cs.wisc.edu:5000/users/'

export default function signUp({ navigation }) {
	const [user, setUser] = React.useState("admin")
	const [pass, setPass] = React.useState("123")
	const data = { username: user, password: pass }

	const goHome = () => {
		navigation.navigate("Home")
	}

	async function createAccount() {
		let response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(response => response.json())
			.then(data => {
				handleCreate(data.message)
			})
			.catch((error) => {
				console.error('Error: ' + error)
			})
	}

	const handleCreate = (data) => {
		if (data === "Username already taken!") {
			Alert.alert(
				"Attention!",
				data,
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel"
					},
					{ text: "OK", onPress: () => console.log("OK Pressed") }
				]
			)
		} else if (data === "User created!") {
			Alert.alert(
				"Attention!",
				data,
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel"
					},
					{ text: "OK", onPress: () => console.log("OK Pressed") }
				]
			)
		} else if (data === "Field password must be 5 characters or longer.") {
			Alert.alert(
				"Attention!",
				data,
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel"
					},
					{ text: "OK", onPress: () => console.log("OK Pressed") }
				]
			)
		}
	}

	return (<View style={styles.container}>
		<Text style={styles.title}>Fitness Tacker</Text>
		<Text style={styles.lead}>Lets get an account started and embark on your fitness journey!</Text>
		<TextInput style={styles.input} onChangeText={setUser} placeholder="username"></TextInput>
		<TextInput style={styles.input} onChangeText={setPass} placeholder="password"></TextInput>
		<Button title="Create Account" color="green" onPress={createAccount} />
		<Button title="Cancel" color="red" onPress={goHome} />
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
		marginTop: 10,
		height: 50,
		width: 300,
		borderColor: 'red',
		borderWidth: 5,
		fontSize: 26,
	},
	inputText: {
		paddingBottom: 4
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