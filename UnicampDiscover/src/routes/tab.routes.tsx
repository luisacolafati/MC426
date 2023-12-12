import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapScreen } from '../screens/MapScreen';
import { BathroomScreen } from '../screens/BathroomScreen';

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
    </Tab.Navigator>
  );
}