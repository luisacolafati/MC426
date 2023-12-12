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



interface  DrinkingFountainCardProps { 
    location: Institutes; 
    floor: number; 
    icon: string;
    avaliacao: [number, number];
}

export function DrinkingFountainCard({ location, floor, icon, avaliacao}: DrinkingFountainCardProps) {

    const navigation = useNavigation<LearnMoreScreenNavigationProp>();
    const[estrela, setEstrela] = useState<number>(avaliacao[0]);
    
    const handleRate = (estrela: number) => {
        // Atualiza a média das avaliações
        const novaMedia = (avaliacao[0] * avaliacao[1] + estrela) / (avaliacao[1] + 1);
        avaliacao[0] = novaMedia;
    
        // Incrementa o número de avaliações
        avaliacao[1]++;
      };

    const handleLearnMorePress = () => {
        navigation.navigate('LearnMoreScreen', {
          location,
          floor,
          icon,
          avaliacao: avaliacao,
        });
      };


    return(
        <View style={styles.bathroomView}>
            <View style={styles.iconBathroom}>
                <Icon name={icon} size={60}></Icon>
            </View>
            <View style={styles.bathroomInternView}>
                <Text style={styles.titleBathroomCard}>Localização: </Text>
                <Text style={styles.textBathroomCard}>{location}</Text>
                <Text style={styles.titleBathroomCard}>Andar: </Text>
                <Text style={styles.textBathroomCard}>{floor}</Text>
 
            </View>

            <View style={styles.alinhamento}>
                <View style={styles.direcao}>
                {[1, 2, 3, 4, 5].map((avaliacao) => {
                    if (avaliacao <= estrela) {
                        return <Entypo name="star" color="#EBC600" size={12} style={styles.espacamento} onPress={() => handleRate(avaliacao)}/>;
                    }
                    return <Entypo name="star" size={12} color='#d9d9d9' style={styles.espacamento} onPress={() => handleRate(avaliacao)}/> ;
                })}
                </View>
            </View>



            <TouchableOpacity onPress={handleLearnMorePress} style={styles.learnMoreButton}>
                <Text style={styles.learnMoreButtonText}> Saiba Mais </Text>
            </TouchableOpacity>
        </View>
    )
}