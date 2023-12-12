import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapScreen } from '../screens/MapScreen';
import { BathroomTabStackScreen } from '../screens/BathroomScreen';
import { LearnMoreScreen } from '../screens/LearnMoreScreen';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'; 
import { Institutes } from '../enums/InstitutesEnum';
import { BathroomScreen } from '../screens/BathroomScreen';
import { BathroomFiltersScreen } from '../screens/BathroomFiltersScreen';
import CRUDScreen from '../screens/Admin/CRUDScreen';

export type RootStackParamList = {
  BathroomScreen: undefined, // undefined because you aren't passing any params to the home screen
  LearnMoreScreen: { location: Institutes, floor: number, icon: string, avaliacao: number }; 
  BathroomFiltersScreen: undefined,
};
const BathroomStack = createStackNavigator<RootStackParamList>();

export function BathroomsTabStack() {
  return (
    <BathroomStack.Navigator>
      <BathroomStack.Screen name="BathroomScreen" component={BathroomTabStackScreen} options ={{headerShown: false}}  />
      <BathroomStack.Screen name="LearnMoreScreen" component={LearnMoreScreen} options ={{headerShown: false}}  />
      <BathroomStack.Screen name="BathroomFiltersScreen" component={BathroomFiltersScreen} options ={{headerShown: false}}  />
    </BathroomStack.Navigator>
  );
}



const Tab = createMaterialBottomTabNavigator();


export function TabRoutes() {
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
        component={CRUDScreen}
        options={{
          tabBarLabel: 'CRUD',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="database" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}