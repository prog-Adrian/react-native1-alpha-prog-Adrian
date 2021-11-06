import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import home from './home'
import signUp from './signUp'
import profile from './profile'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={home}/>
        <Stack.Screen name="SignUp"  component={signUp}/>
        <Stack.Screen name="Profile" component={profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
