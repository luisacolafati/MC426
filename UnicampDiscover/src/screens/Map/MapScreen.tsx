import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchHeadingAsync, watchPositionAsync, LocationAccuracy} from 'expo-location'
import { InstitutesService } from '../../services/firestore/InstitutesService';
import { Institute } from '../../types/Institute';
import { styles, mapstyle } from './styles/styles'
import { Bathroom } from '../../types/Bathroom';
import { DrinkingFountain } from '../../types/DrinkingFountain';
import { BathroomService } from '../../services/firestore/BathroomService';
import { DrinkingFountainService } from '../../services/firestore/DrinkingFountainService';
import _ from 'lodash'

export function MapScreen() {

  const initialRegion = {
    latitude: -22.8135,
    longitude: -47.0635,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState(initialRegion);
  
  const [institutes, setInstitutes] = useState<Institute[]>([])

  const [bathrooms, setBathrooms] = useState<Bathroom[]>([])
  const [bathroomsGroupedByInstitute, setBathroomsGroupedByInstitute] = useState<any[]>([])
  
  const [drinkingFountains, setDrinkingFountains] = useState<DrinkingFountain[]>([])
  const [drinkingFountainsGroupedByInstitute, setDrinkingFountainsGroupedByInstitute] = useState<any[]>([])  
  
  /* const markerCoordinates = {
    latitude: -22.8135,
    longitude: -47.0635,
  }; */

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
    }, (response : any) => {
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
    const getInstitutes = async () => {
      const instituteService = InstitutesService.getInstance()
      const institutes = await instituteService.getAllDocuments()
      setInstitutes(institutes)
    }

    const getBathrooms = async () => {
      const bathroomService = BathroomService.getInstance()
      const bathrooms = await bathroomService.getAllDocuments()
      setBathrooms(bathrooms)
    }

    const getDrinkingFountains = async () => {
      const drinkingFountainService = DrinkingFountainService.getInstance()
      const drinkingFountains = await drinkingFountainService.getAllDocuments()
      setDrinkingFountains(drinkingFountains)
    }

    getInstitutes()
    /* getBathrooms()
    getDrinkingFountains() */
  }, []);

  useEffect(() => {
     console.log(_.groupBy(bathrooms, (bathroom: Bathroom) => bathroom.data.instituteLocation))
     console.log(_.groupBy(drinkingFountains, (drinkingFountain: Bathroom) => drinkingFountain.data.instituteLocation))
  }, [bathrooms])
  
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
                latitude: institute.data.location.latitude,
                longitude: institute.data.location.longitude,
              }}
              //title={institute.nome}
            >
              <Callout>
                <View>
                  <Text>{institute.data.name}</Text>
                  {/* <View>
                  <Text>Banheiros: {institute.banheiros}</Text>  
                  </View>
            <Text>Bebedouros: {institute.bebedouros}</Text> */}
                </View>
              </Callout>
            </Marker>
          ))}
        
      </MapView>
    </SafeAreaView>
  );
}
