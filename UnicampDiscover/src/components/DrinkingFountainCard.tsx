// DrinkingFountainCard.tsx

//DrinkingFountainCard.tsx
import React, { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LearnMoreScreenNavigationProp } from '../screens/LearnMoreDrinkingFountainScreen'; 
import { Institutes } from '../enums/InstitutesEnum';
import Entypo from 'react-native-vector-icons/Entypo';
import { Avatar } from '@rneui/themed';

import { DrinkingFountain } from '../types/DrinkingFountain';



interface  DrinkingFountainCardProps { 
    icon: string;
    document_data: DrinkingFountain;
}

export function DrinkingFountainCard({ icon, document_data}: DrinkingFountainCardProps) {

    const navigation = useNavigation<LearnMoreScreenNavigationProp>();
    const[estrela, setEstrela] = useState<number>(document_data.rating.averageRate);
    
    const handleRate = (estrela: number) => {
        // Atualiza a média das avaliações
        const novaMedia = (document_data.rating.averageRate * document_data.rating.numberOfRates + estrela) / (document_data.rating.numberOfRates + 1);
        document_data.rating.averageRate = novaMedia;
    
        // Incrementa o número de avaliações
        document_data.rating.numberOfRates++;
      };

    const handleLearnMorePress = () => {
        navigation.navigate('LearnMoreScreen', {

          icon,
          document_data,
        });
      };


    return(
        <View style={styles.bathroomView}>
            <View style={styles.iconBathroom}>
                <Icon name={icon} size={60}></Icon>
            </View>
            <View style={styles.bathroomInternView}>
                <Text style={styles.titleBathroomCard}>Localização: </Text>
                <Text style={styles.textBathroomCard}>{document_data.data.instituteLocation}</Text>
                <Text style={styles.titleBathroomCard}>Andar: </Text>
                <Text style={styles.textBathroomCard}>{document_data.data.floor}</Text>
 
            </View>

            <View style={styles.alinhamento}>
                <View style={styles.direcao}>
                    {[1, 2, 3, 4, 5].map((avaliacao) => {
                        const starColor = avaliacao <= document_data.rating.averageRate ? "#EBC600" : '#d9d9d9';
                        return <Entypo name="star" color={starColor} size={12} style={styles.espacamento} />;
                    })}
                    <Text>{document_data.rating.averageRate}</Text>
                </View>
            </View>




            <TouchableOpacity onPress={handleLearnMorePress} style={styles.learnMoreButton}>
                <Text style={styles.learnMoreButtonText}> Saiba Mais </Text>
            </TouchableOpacity>
        </View>
    )
}