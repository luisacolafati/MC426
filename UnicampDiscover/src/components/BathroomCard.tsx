//BathroomCard.tsx
import React from 'react';
import { useEffect, useState } from 'react'; 
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { LearnMoreScreenNavigationProp } from '../screens/LearnMoreScreen'; 
import { Institutes } from '../enums/InstitutesEnum';
interface  BathroomCardProps { 
    location: Institutes; 
    floor: number; 
    icon: string;
    avaliacao: number;
}

export function BathroomCard({ location, floor, icon, avaliacao}: BathroomCardProps) {

    const[estrela, setEstrela] = useState<number>(avaliacao);
    const navigation = useNavigation<LearnMoreScreenNavigationProp>();

    const handleLearnMorePress = () => {
        navigation.navigate('LearnMoreScreen', {
          location,
          floor,
          icon,
          avaliacao,
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
                        return <Entypo name="star" color="#EBC600" size={12} 
                        style={styles.espacamento}/>;
                    }
                    return <Entypo name="star" size={12} color='#d9d9d9' 
                    style={styles.espacamento}/> ;
                })}
                </View>
            </View>

            <TouchableOpacity onPress={handleLearnMorePress} style={styles.learnMoreButton}>
                <Text style={styles.learnMoreButtonText}> Saiba Mais </Text>
            </TouchableOpacity>
        </View>
    )
}