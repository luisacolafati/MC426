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
import { BathroomService } from '../services/firestore/BathroomService';

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
    const { icon, document_data } = route.params;
    const[estrela, setEstrela] = useState<number>(0);

    const handleSubmitEvaluation = async () => {
      try {
        
          const bathroomService = BathroomService.getInstance()
          const bathrooms = await bathroomService.getAllDocuments()
    
          const novaMedia = (document_data.rating.averageRate * document_data.rating.numberOfRates + estrela) / (document_data.rating.numberOfRates + 1);
          document_data.rating.averageRate = novaMedia;
  
          document_data.rating.numberOfRates++;

          await bathroomService.updateDocument(document_data)

        alert('Avaliação submetida com sucesso!');
        bathrooms;
        navigation.navigate('BathroomScreen',{});
      } catch (error) {
        console.error(error);
        alert(
          'Houve um erro ao submeter a avaliação. Tente novamente mais tarde.'
        );
        navigation.navigate('BathroomScreen',{});
      }
    };
    return (
        <View>
          <Text style={styles.learnMoreTitle}>Saiba Mais</Text>
          <View style={{top: 170, alignItems: 'center', height: 'auto' }}>
          <BathroomCard 
           icon={icon}
           document_data={document_data}      
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
          <Button 
                title="Submeter avaliação"
                color="#228B22"
                onPress={handleSubmitEvaluation }
                
            />
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
