import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import home from './home'
import signUp from './signUp'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={home}/>
        <Stack.Screen name="signUp" component={signUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
