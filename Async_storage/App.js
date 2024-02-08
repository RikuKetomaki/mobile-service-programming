import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeScreen from './HomeScreen.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DetailScreen from './DetailScreen.js';

export default function App () {
  const Stack = createNativeStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitle:'Home',
        }}
        />
        <Stack.Screen 
        name="Todo"
        component={DetailScreen}
        options={{
          title: 'Todo',
          headerTitle:'Todo'
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}