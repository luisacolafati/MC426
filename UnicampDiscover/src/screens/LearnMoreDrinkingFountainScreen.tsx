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

import { getDatabase, ref, set } from "firebase/database";
// import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
// import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';


// const db = getFirestore();
// const citiesRef = db.collection('cities');






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
    const { location, floor, icon, avaliacao } = route.params;
    const[estrela, setEstrela] = useState<number>(0);

    const avaliacaoService = new FirestoreService('avaliacao');
    // const app = initializeApp(firebaseConfig);
     

    const calculateNewMedia = (oldMedia: number, oldNumberOfReviews: number, newStar: number): number => {
        return (oldMedia * oldNumberOfReviews + newStar) / (oldNumberOfReviews + 1);
      };
      
    const handleSubmitEvaluation = async () => {
        try {
          
            const drinkingFountainService = drinkingFountainService.getInstance()
            const drinkingFountains = await drinkingFountainService.getAllDocuments()
      
            // Obtenha os dados atuais do bebedouro
            const doc = await drinkingFountainRef.get();
            
            // Verifique se o documento existe antes de acessar as propriedades
            if (doc.exists) {
                const data = doc.data();

                // Verifique se 'data' não é nulo ou indefinido
                if (data) {
                // Atualize os dados do bebedouro com a nova avaliação
                const novaAvaliacao = {
                    avaliacao: [(data.avaliacao[0] * data.avaliacao[1] + estrela) / (data.avaliacao[1] + 1), data.avaliacao[1] + 1],
                };

                await drinkingFountainRef.update(novaAvaliacao);
                } else {
                console.error('Dados do bebedouro são nulos ou indefinidos.');
                }
            } else {
                console.error('O documento do bebedouro não existe.');
            }
          alert('Avaliação submetida com sucesso!');
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
            location={location}
            floor={floor}
            avaliacao={avaliacao}
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