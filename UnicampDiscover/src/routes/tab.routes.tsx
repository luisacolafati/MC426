import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapScreen } from '../screens/MapScreen';
import { BathroomScreen } from '../screens/BathroomScreen';
import { DrinkingFuntainScreen } from '../screens/DrinkingFuntainScreen';
import { LoginScreen } from '../screens/LoginScreen';

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
        component={BathroomScreen}
        options={{
          tabBarLabel: 'Banheiros',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="toilet" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="DrinkingFuntainScreen"
        component={DrinkingFuntainScreen}
        options={{
          tabBarLabel: 'Bebedouros',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="water-pump" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}