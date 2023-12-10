import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { AdminScreen } from '../screens/AdminScreen';

const Stack = createStackNavigator();

export function StackRoutes() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
  );
}