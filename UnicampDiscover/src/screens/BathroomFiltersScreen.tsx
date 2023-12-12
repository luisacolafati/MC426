import * as React from 'react';
import { View, Button, ScrollView, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'; 
import { useState } from 'react';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/tab.routes'; 
import 'react-native-gesture-handler';
import { styles } from '../styles/styles';
import { BathroomService } from '../services/firestore/BathroomService'; 
import { CollectionNames } from "../database/CollectionNames";
import { Bathroom } from "../types/Bathroom";
import { Gender } from "../enums/GenderEnum";

type BathroomFiltersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BathroomFiltersScreen'
>;

type BathroomFiltersProps = {
  navigation: BathroomFiltersScreenNavigationProp;
};

export function BathroomFiltersScreen({ navigation }: BathroomFiltersProps){
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const availableFilters = [
        'Feminino',
        'Masculino',
        'Neutro',
        'IA',
        'IB',
        'IC 3.5',
        'IE',
        'IEL',
        'IFCH',
        'IFGW',
        'IG',
        'IMECC',
        'IQ',
        'FCF',
        'FEA',
        'FEAGRI',
        'FEC',
        'FEEC',
        'FEM',
        'FEQ',
        'FCM',
        'FEF',
        'FE',
      ];

      const toggleFilter = (filter: string) => {
        const updatedFilters = selectedFilters.includes(filter)
          ? selectedFilters.filter((item) => item !== filter)
          : [...selectedFilters, filter];
        setSelectedFilters(updatedFilters);
      };  

      return (
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.learnMoreTitle}>Filtros</Text>
          <View style={styles.columnContainer}>
            <View style={styles.column}>
              {availableFilters.slice(0, Math.ceil(availableFilters.length / 2)).map((filter, index) => (
                <CheckBox
                  key={index}
                  title={filter}
                  checked={selectedFilters.includes(filter)}
                  onPress={() => toggleFilter(filter)}
                  containerStyle={styles.checkboxContainer}
                  checkedColor="#850A0A"
                />
              ))}
            </View>
            <View style={styles.column}>
              {availableFilters.slice(Math.ceil(availableFilters.length / 2)).map((filter, index) => (
                <CheckBox
                  key={index}
                  title={filter}
                  checked={selectedFilters.includes(filter)}
                  onPress={() => toggleFilter(filter)}
                  containerStyle={styles.checkboxContainer}
                  checkedColor="#850A0A"
                />
              ))}
            </View>
          </View>
          <View style={styles.bathroomFilterButton}>
            <Button
              title="Filtrar banheiros"
              color="#850a0a"
              onPress={() => {
                // Implement your filter logic using selectedFilters
                console.log('Selected Filters:', selectedFilters);
                navigation.navigate('BathroomScreen');
              }}
            />
          </View>
          <View style={styles.goBackButton}>
            <Button
              title="Voltar"
              color="#850a0a"
              onPress={() => navigation.navigate('BathroomScreen')}
            />
          </View>
        </View>
      </ScrollView>
    );
  }