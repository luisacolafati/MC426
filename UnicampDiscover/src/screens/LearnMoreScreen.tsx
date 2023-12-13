// LearnMoreScreen.tsx
import * as React from 'react';
import { useEffect, useState } from 'react'; 
import { View, Button, Text } from 'react-native';
import { BathroomCard } from '../components/BathroomCard';
import { styles } from '../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo'; 
import { RootStackParamList } from '../routes/tab.routes'; 
import { RouteProp } from '@react-navigation/native';
import { doc, updateDoc } from "firebase/firestore";

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
  const { location, floor, icon, avaliacao } = route.params;
    const[estrela, setEstrela] = useState<number>(0);

    /*const db = firebase.firestore();
    const BathroomRating = doc(db, "bathrooms");

    await updateDoc(BathroomRating, {
      avaliacao: estrela
    });*/
    
    return (
        <View>
          <Text style={styles.learnMoreTitle}>Saiba Mais</Text>
          <View style={{top: 170, alignItems: 'center', height: 'auto' }}>
          <BathroomCard 
           icon={icon}
            location={location}
            floor={floor}
            avaliacao={avaliacao}
            /></View>
          <View style={styles.avaliacao}>
              <Text style={{color:'#000000', fontSize: 20, fontWeight: 'bold', marginBottom: '4%'}}>Avalie este banheiro </Text>
              <View style={styles.direcao}>
              {[1, 2, 3, 4, 5].map((element) => {
                  if (element <= estrela) {
                      return <Entypo name="star" color="#EBC600" size={50} 
                      onPress={() => setEstrela(element)} style={styles.espacamento}/>;
                  }
                  return <Entypo name="star" size={50} color='#d9d9d9' 
                  onPress={() => setEstrela(element)} style={styles.espacamento}/>;
                  
              })}
              </View>
              <Text>{estrela}</Text>
          </View>
          <View style={styles.goBackButton}>
          <Button 
            title="Voltar"
            color = '#850a0a'
            onPress={() => 
              navigation.navigate('BathroomScreen', {})}
          /></View>
        </View>
      );
}
