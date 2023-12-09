import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapScreen } from '../screens/MapScreen';
import { BathroomScreen } from '../screens/BathroomScreen';
import { LearnMoreScreen } from '../screens/LearnMoreScreen';
import { createStackNavigator } from '@react-navigation/stack';

const BathroomStack = createStackNavigator();

function BathroomsTabStack() {
  return (
    <BathroomStack.Navigator>
      <BathroomStack.Screen name="BathroomScreen" component={BathroomScreen} />
      <BathroomStack.Screen name="LearnMoreScreen" component={LearnMoreScreen} />
    </BathroomStack.Navigator>
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
    </Tab.Navigator>
  );
}