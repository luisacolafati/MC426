//BathroomCard.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LearnMoreScreenNavigationProp } from '../screens/LearnMoreScreen'; 
import { Institutes } from '../enums/InstitutesEnum';
interface  BathroomCardProps { 
    location: Institutes; 
    floor: number; 
    icon: string;
}

export function BathroomCard({ location, floor, icon}: BathroomCardProps) {

    const navigation = useNavigation<LearnMoreScreenNavigationProp>();

    const handleLearnMorePress = () => {
        navigation.navigate('LearnMoreScreen', {
          location,
          floor,
          icon,
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

            <TouchableOpacity onPress={handleLearnMorePress} style={styles.learnMoreButton}>
                <Text style={styles.learnMoreButtonText}> Saiba Mais </Text>
            </TouchableOpacity>
        </View>
    )
}