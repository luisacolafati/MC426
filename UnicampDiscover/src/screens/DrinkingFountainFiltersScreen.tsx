import * as React from 'react';
import { View, Button, ScrollView, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/tab.routes';
import { styles } from '../styles/styles';
import { Institutes } from '../enums/InstitutesEnum';

type DrinkingFountainFiltersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DrinkingFountainFiltersScreen'
>;

type DrinkingFountainFiltersProps = {
  navigation: DrinkingFountainFiltersScreenNavigationProp;
};

export function DrinkingFountainFiltersScreen({ navigation }: DrinkingFountainFiltersProps) {
  const [selFilters, setSelFilters] = useState<(Institutes)[]>([]);

  const availableFilters: (Institutes)[] = [
    ...Object.values(Institutes),
  ];

  const toggleFilter = (filter: Institutes) => {
    let updatedFilters: (Institutes)[] = [];

    if (isInstitute(filter)) {
      // Toggle the selected institute filter
      updatedFilters = selFilters.includes(filter)
        ? selFilters.filter((item) => !isInstitute(item))
        : [...selFilters, filter];
    }

    setSelFilters(updatedFilters);
  };
  
  const isInstitute = (value: any): value is Institutes => Object.values(Institutes).includes(value);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.learnMoreTitle}>Filtragem de Bebedouros</Text>
        <View style={styles.columnContainer}>
          <View style={styles.column}>
            {availableFilters.slice(0, Math.ceil(availableFilters.length / 2)).map((filter, index) => (
              <CheckBox
                key={index}
                title={filter.toString()}
                checked={selFilters.includes(filter)}
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
                title={filter.toString()}
                checked={selFilters.includes(filter)}
                onPress={() => toggleFilter(filter)}
                containerStyle={styles.checkboxContainer}
                checkedColor="#850A0A"
              />
            ))}
          </View>
        </View>
        <View style={styles.bathroomFilterButton}>
          <Button
            title="Filtrar bebedouros"
            color="#850a0a"
            onPress={() => {
       //       console.log('Selected Filters:', selectedFilters);
              navigation.navigate('DrinkingFountainScreen', {
                selectedFilters: selFilters,
              });
            }}
          />
        </View>
        <View style={styles.goBackButton}>
          <Button
            title="Voltar"
            color="#850a0a"
            onPress={() => navigation.navigate('DrinkingFountainScreen', {})}
          />
        </View>
      </View>
    </ScrollView>
  );
}
