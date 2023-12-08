import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchHeadingAsync, watchPositionAsync, LocationAccuracy} from 'expo-location'



export function MapScreen() {

  const initialRegion = {
    latitude: -22.8135,
    longitude: -47.0635,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState(initialRegion);

  const markerCoordinates = {
    latitude: -22.8135,
    longitude: -47.0635,
  };

  async function requestLocation() {
    const {granted} = await requestForegroundPermissionsAsync();

    if (granted) {
      const posicao = await getCurrentPositionAsync();
      setLocation(posicao);
    }
  }

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
      setMapRegion({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      })
      console.log(response);
    });
  }, [])

  
return (
<SafeAreaView style={styles.container}>
<MapView
style={styles.map}
customMapStyle={mapstyle}
initialRegion={ initialRegion}
region = {mapRegion}
>
<Marker
coordinate={{
latitude: location?.coords.latitude || 0,
longitude: location?.coords.longitude || 0
}}
/>
</MapView>
</SafeAreaView>
);
}

const mapstyle = 
[
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});