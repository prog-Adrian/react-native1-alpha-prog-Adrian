import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import signUp from './signUp'


export default function home( {navigation} ) {
  const [username, setUser] = React.useState("Username")
  const [password, setPass] = React.useState("Password")

  const signUpPage = () => {
	  navigation.navigate("signUp")
  }

	return (<View style={styles.container}>
		<TextInput onChangeText={setUser} placeholder={username} />
		<TextInput onChangeText={setPass} placeholder={password} />
		<Button title="Login" color="black"/>
		<Button title="Sign up" color="red" onPress={signUpPage}/>
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
});