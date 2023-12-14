import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapScreen } from '../screens/MapScreen';
import { BathroomTabStackScreen } from '../screens/BathroomScreen';
import { LearnMoreScreen } from '../screens/LearnMoreScreen';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Gender } from "../enums/GenderEnum";
import { InstituteNames } from '../enums/InstituteNamesEnum';
import { DrinkingFountainTabStackScreen } from '../screens/DrinkingFountainScreen';
//import { BathroomScreen } from '../screens/BathroomScreen';
import CRUDScreen from '../screens/Admin/CRUDScreen';
import { LearnMoreScreenDrinkingFountain } from '../screens/LearnMoreDrinkingFountainScreen';
import { Rating } from '../types/Rating';
import { DrinkingFountain } from '../types/DrinkingFountain';
import { Bathroom } from '../types/Bathroom';
import { BathroomFiltersScreen } from '../screens/BathroomFiltersScreen';
import { DrinkingFountainFiltersScreen } from '../screens/DrinkingFountainFiltersScreen';

export type RootStackParamList = {
  BathroomScreen: { filters?: (Gender | InstituteNames)[] }, // undefined because you aren't passing any params to the home screen
  BathroomFiltersScreen: undefined,
  DrinkingFountainScreen: { selectedFilters?: (InstituteNames)[] },
  DrinkingFountainFiltersScreen: undefined,
  LearnMoreScreen: { icon: string, document_data:  Bathroom |  DrinkingFountain }; 
};
const BathroomStack = createStackNavigator<RootStackParamList>();
const DrinkingFountainStack = createStackNavigator<RootStackParamList>();

export function BathroomsTabStack() {
  return (
    <BathroomStack.Navigator>
      <BathroomStack.Screen name="BathroomScreen" component={BathroomTabStackScreen} options ={{headerShown: false}}  />
      <BathroomStack.Screen name="LearnMoreScreen" component={LearnMoreScreen} options ={{headerShown: false}}  />
      <BathroomStack.Screen name="BathroomFiltersScreen" component={BathroomFiltersScreen} options ={{headerShown: false}}  />
    </BathroomStack.Navigator>
  );
}

export function DrinkingFountainsTabStack() {
  return (
    <DrinkingFountainStack.Navigator>
      <DrinkingFountainStack.Screen name="DrinkingFountainScreen" component={DrinkingFountainTabStackScreen} />
      <DrinkingFountainStack.Screen name="LearnMoreScreen" component={LearnMoreScreenDrinkingFountain} />
      <DrinkingFountainStack.Screen name="DrinkingFountainFiltersScreen" component={DrinkingFountainFiltersScreen} options ={{headerShown: false}}  />
    </DrinkingFountainStack.Navigator>
  );
}


const Tab = createMaterialBottomTabNavigator();


export function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#850a0a"
      inactiveColor="#babab7"
      style={{ backgroundColor: "#fcfcfa" }}
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
        name="DrinkingFountainScreen"
        component={ DrinkingFountainsTabStack}
        options={{
          tabBarLabel: 'Bebedouros',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="water-pump" color={color} size={26} />
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