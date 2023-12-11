// LearnMoreScreen.tsx
import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { BathroomCard } from '../components/BathroomCard';
import { styles } from '../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../routes/tab.routes'; 
import { RouteProp } from '@react-navigation/native';


export type LearnMoreScreenNavigationProp = StackNavigationProp<
RootStackParamList, 
'LearnMoreScreen'
>; 
type LearnMoreScreenRouteProp = RouteProp<RootStackParamList, 'LearnMoreScreen'>;

type LearnProps = {
    navigation: LearnMoreScreenNavigationProp;
    route: LearnMoreScreenRouteProp;
}

export function LearnMoreScreen({ navigation, route }: LearnProps){
    const { location, floor, icon } = route.params;
    return (
        <View>
          <Text style={styles.learnMoreTitle}>Saiba Mais</Text>
          <View style={{ position: 'absolute', top: 170, left: 53, width: '80%', height: 'auto' }}>
          <BathroomCard 
            icon={icon}
            location={location}
            floor={floor}
            /></View>
          <Text style={{position: 'absolute', top: 339, left: 100, color:'#000000', fontSize: 20, fontWeight: 'bold'  }}>Avalie este banheiro </Text>
          <View style={styles.goBackButton}>
          <Button 
            title="Voltar"
            color = '#850a0a'
            onPress={() => navigation.navigate('BathroomScreen')}
          /></View>
        </View>
      );
}
