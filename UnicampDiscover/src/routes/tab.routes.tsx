import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapScreen } from '../screens/MapScreen';
import { BathroomTabStackScreen } from '../screens/BathroomScreen';
import { LearnMoreScreen } from '../screens/LearnMoreScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; 
import { Institutes } from '../enums/InstitutesEnum';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type LoginScreenNavigationProp = StackNavigationProp<
RootStackParamList, 
'LoginScreen'
>; 
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;

type TabRoutesProps = {
    navigation: LoginScreenNavigationProp;
    route: LoginScreenRouteProp;
}

export type RootStackParamList = {
  BathroomScreen: undefined, // undefined because you aren't passing any params to the home screen
  LearnMoreScreen: { location: Institutes, floor: number, icon: string, avaliacao: number }; 
  LoginScreen: { user: boolean }
};
const BathroomStack = createStackNavigator<RootStackParamList>();

export function BathroomsTabStack() {
  return (
    <BathroomStack.Navigator>
      <BathroomStack.Screen name="BathroomScreen" component={BathroomTabStackScreen} options ={{headerShown: false}}  />
      <BathroomStack.Screen name="LearnMoreScreen" component={LearnMoreScreen} options ={{headerShown: false}}  />
      <BathroomStack.Screen name="LoginScreen" component={LoginScreen} options ={{headerShown: false}}  />
    </BathroomStack.Navigator>
  );
}

import CRUDScreen from '../screens/Admin/CRUDScreen';

const Tab = createMaterialBottomTabNavigator();

export function TabRoutes({ route, navigation }: TabRoutesProps) {
  const { user } = route.params;
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#A8BBB0"
      inactiveColor="#850A0A"
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="BathroomScreen"
        component={ BathroomsTabStack}
        options={{
          tabBarLabel: 'Banheiros',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="toilet" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CRUDScreen"
        component={user ? CRUDScreen : LoginScreen}
        options={{
          tabBarLabel: user ? 'CRUD' : 'Login',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={user ? "database" : "login"} color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}