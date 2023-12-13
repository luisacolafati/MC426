import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchHeadingAsync, watchPositionAsync, LocationAccuracy} from 'expo-location'
import { Section } from 'react-native-paper/lib/typescript/src/components/List/List';



export function MapScreen() {

  const initialRegion = {
    latitude: -22.8135,
    longitude: -47.0635,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState(initialRegion);
  const [institutes, setInstitutes] = useState<any[]>([])
  

  const markerCoordinates = {
    latitude: -22.8135,
    longitude: -47.0635,
  };


  async function requestLocation() {
    const {granted} = await requestForegroundPermissionsAsync();

    if (granted) {
      const posicao = await getCurrentPositionAsync();
      setLocation(posicao);
      setMapRegion({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
        })
    }
  }

  // Pede a localizaçao
  useEffect(() => {
    requestLocation();
  }, []);

  // Observa a posicao do dispositivo
  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);

      /*Essa parte comentada a baixo é responsavel por focar no usuario
      Minha ideia é ter um botao q ativa/desativa isso, que nem no waze
      porque se isso estiver sempre ligado o usuario nao consegue olhar 
      o mapa
      */

      //setMapRegion({
      //  latitude: response.coords.latitude,
      //  longitude: response.coords.longitude,
      //  latitudeDelta: 0.001,
      //  longitudeDelta: 0.001
      //})

    });
  }, [])

  useEffect(() =>  {
    // Essa lista deveria vir do banco de dados, mas nn sei fazer isso agora
    // Então vou usar essa lista manual e depois penso no FireBase
    // Mas a logica pra adicionar os marcadores ta ai
    const listInstitutes = [{
      id: 1,
      nome: "IC3",
      latitude: -22.81362,
      longitude: -47.06391,
      banheiros : 3,
      bebedouros: 1
    }, {
      id:2,
      nome:"IE",
      latitude: -22.81493,
      longitude: -47.0658,
      banheiros : 3,
      bebedouros: 1
    },
    {
      id:3,
      nome:"IMECC",
      latitude: -22.81576,
      longitude: -47.06779,
      banheiros : 3,
      bebedouros: 1
    }
  ]

      setInstitutes(listInstitutes);
  }, []);
  
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

    {institutes.map((institute) => (
        <Marker
          key={institute.id}
          coordinate={{
            latitude: institute.latitude,
            longitude: institute.longitude,
          }}
          //title={institute.nome}
        >
          <Callout>
            <View>
              <Text>{institute.nome}</Text>
              <View>
              <Text>Banheiros: {institute.banheiros} </Text>  
              </View>
              <Text>Bebedouros: {institute.bebedouros}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    
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
  imagem: {
    width: 25,
    height: 25,
  }
});
