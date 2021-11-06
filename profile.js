import React, { useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Button, TextInput, Alert} from 'react-native';

const baseURL = 'http://cs571.cs.wisc.edu:5000/users/'

export default function profile({ route, navigation }) {
	const { idToken, prevData, username } = route.params
	const [fName, setFName] = React.useState(prevData.firstName)
	const [lName, setLName] = React.useState(prevData.lastName)
	const [cal, setCal] = React.useState(prevData.goalDailyCalories.toString())
	const [protein, setPro] = React.useState(prevData.goalDailyProtein.toString())
	const [carbs, setCarbs] = React.useState(prevData.goalDailyCarbohydrates.toString())
	const [fats, setFats] = React.useState(prevData.goalDailyFat.toString())
	const [activity, setActivity] = React.useState(prevData.goalDailyActivity.toString())

	const save = async () => {
		let url = baseURL + username
		let response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': idToken
			},
			body: JSON.stringify({
				firstName: fName,
				lastName: lName,
				goalDailyCalories: parseFloat(cal),
				goalDailyProtein: parseFloat(protein),
				goalDailyCarbohydrates: parseFloat(carbs),
				goalDailyFat: parseFloat(fats),
				goalDailyActivity: parseFloat(activity),
			})
		})
			.then(response => response.json())
			.catch(error => {
				console.error("Error" + error)
			})
			saveAlert(response)

	}

	const saveAlert = (response) => {
		if (response.message) {
			Alert.alert(
				"Attention!",
				response.message,
				[
					{
						text: "Cancel",
						style: "cancel"
					},
					{ text: "OK" }
				]
			)
		}
	}

	const goHome = () => {
		navigation.navigate("Home")
	}


	return (
		<ScrollView>
			<View style={styles.container}>
			<Text style={styles.title}>About Me!</Text>
			<Text style={styles.lead}>Lets get to know each other!</Text>
			<Text style={styles.lead}>Enter some personal data below :)</Text>
			<Text style={{ marginTop: 25, marginBottom: 10, color: 'red', fontSize: 25 }}>Personal information</Text>
			<Text style={{ marginBottom: 0, color: 'red', fontSize: 15 }}>First Name</Text>
			<TextInput style={styles.input} onChangeText={setFName} value={fName}></TextInput>
			<Text style={{ marginBottom: 0, color: 'red', fontSize: 15, justifyContent: 'flex-start' }}>Last Name</Text>
			<TextInput style={styles.input} onChangeText={setLName} value={lName}></TextInput>
			<Text style={{ marginBottom: 0, color: 'red', fontSize: 15 }}>Calories</Text>
			<TextInput style={styles.input} onChangeText={setCal} value={cal}></TextInput>
			<Text style={{ marginBottom: 0, color: 'red', fontSize: 15 }}>Protein</Text>
			<TextInput style={styles.input} onChangeText={setPro} value={protein}></TextInput>
			<Text style={{ marginBottom: 0, color: 'red', fontSize: 15 }}>Carbohydrates</Text>
			<TextInput style={styles.input} onChangeText={setCarbs} value={carbs}></TextInput>
			<Text style={{ marginBottom: 0, color: 'red', fontSize: 15 }}>Fats</Text>
			<TextInput style={styles.input} onChangeText={setFats} value={fats}></TextInput>
			<Text style={{ marginBottom: 0, color: 'red', fontSize: 15 }}>Activity</Text>
			<TextInput style={styles.input} onChangeText={setActivity} value={activity}></TextInput>
			<Text style={{ marginTop: 25, marginBottom: 0, color: 'red', fontSize: 25 }}>All done?</Text>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Button title="Save" onPress={save} />
				<Button title="Exit" onPress={goHome} />
			</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 20,
		width: 200,
		alignItems: 'flex-start',
		marginBottom: 20,
		textAlign: 'center',
		marginTop: 20,
	},
	button: {
		height: 50,
		width: 200,
		fontSize: 50,
		color: 'red',
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