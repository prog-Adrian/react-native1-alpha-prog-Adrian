import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';


export default function signUp({ navigation }) {
	const [user, setUser] = React.useState("admin")
	const [pass, setPass] = React.useState("123")

	const goHome = () => {
		navigation.navigate("Home")
	}

	return(<View style={styles.container}>
		<TextInput style={styles.input} placeholder="username"></TextInput>
		<TextInput style={styles.input} placeholder="password"></TextInput>
		<Button title="Create Account" color="green"/>
		<Button title="Cancel" color="red" onPress={goHome}/>
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
		borderColor: 'red',
		borderBottomWidth: 2,
		borderTopWidth: 2,
		fontSize: 26,
	},
	inputText: {
		paddingBottom: 4
	},
});