// LearnMoreScreen.tsx
import * as React from 'react';
import { useEffect, useState } from 'react'; 
import { View, Button, Text } from 'react-native';
import { DrinkingFountainCard } from '../components/DrinkingFountainCard';
import { styles } from '../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo'; 
import { RootStackParamList } from '../routes/tab.routes'; 
import { RouteProp } from '@react-navigation/native';
import { doc, updateDoc, collection, getDocs, getFirestore, CollectionReference  } from "firebase/firestore/lite";
import * as firebase from 'firebase/app';
import { FirestoreService } from '../services/firestore/FirestoreService';
import 'firebase/firestore';
import { firebaseApp } from "../config/FirebaseConfig";
import { DrinkingFountainService } from '../services/firestore/DrinkingFountainService'

import { getDatabase, ref, set } from "firebase/database";

export type LearnMoreScreenNavigationProp = StackNavigationProp<
RootStackParamList, 
'LearnMoreScreen'
>; 
type LearnMoreScreenRouteProp = RouteProp<RootStackParamList, 'LearnMoreScreen'>;

type LearnProps = {
    navigation: LearnMoreScreenNavigationProp;
    route: LearnMoreScreenRouteProp;
}



export function LearnMoreScreenDrinkingFountain({ navigation, route }: LearnProps){
    const { icon, document_data } = route.params;
    const[estrela, setEstrela] = useState<number>(0);

    
      
    const handleSubmitEvaluation = async () => {
        try {
          
            const drinkingFountainService = DrinkingFountainService.getInstance()
            const drinkingFountains = await drinkingFountainService.getAllDocuments()
      
            const novaMedia = (document_data.rating.averageRate * document_data.rating.numberOfRates + estrela) / (document_data.rating.numberOfRates + 1);
            document_data.rating.averageRate = novaMedia;
    
            document_data.rating.numberOfRates++;

            await drinkingFountainService.updateDocument(document_data)

          alert('Avaliação submetida com sucesso!');
          drinkingFountains;
          navigation.navigate('DrinkingFountainScreen');
        } catch (error) {
          console.error(error);
          alert(
            'Houve um erro ao submeter a avaliação. Tente novamente mais tarde.'
          );
          navigation.navigate('DrinkingFountainScreen');
        }
      };
    
    return (
        
        <View>
          <Text style={styles.learnMoreTitle}>Saiba Mais</Text>
          <View style={{top: 170, alignItems: 'center', height: 'auto' }}>
          <DrinkingFountainCard 
           icon={icon}
           document_data={document_data}         

            /></View>
          <View style={styles.avaliacao}>
              <Text style={{color:'#000000', fontSize: 20, fontWeight: 'bold', marginBottom: '4%'}}>Avalie este bebedouro </Text>
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
            <Button 
                title="Submeter avaliação"
                color="#228B22"
                onPress={handleSubmitEvaluation }
                
            />
          <View style={styles.goBackButton}>
          <Button 
            title="Voltar"
            color = '#850a0a'
            onPress={() => navigation.navigate('DrinkingFountainScreen')}
          /></View>
        </View>
      );
}