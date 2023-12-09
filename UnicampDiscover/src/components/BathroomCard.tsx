import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface  BathroomCardProps { 
    location: string; 
    address: string;
    floor: string; 
    icon: string;
}

export function BathroomCard({ location, address, floor, icon}: BathroomCardProps) {

    return(
        <View style={styles.bathroomView}>
            <View style={styles.iconBathroom}>
                <Icon name={icon} size={60}></Icon>
            </View>
            <View style={styles.bathroomInternView}>
                <Text style={styles.titleBathroomCard}>Localização: </Text>
                <Text style={styles.textBathroomCard}>{location}</Text>
                <Text style={styles.titleBathroomCard}>Endereço: </Text>
                <Text style={styles.textBathroomCard}>{address}</Text>
                <Text style={styles.titleBathroomCard}>Andar: </Text>
                <Text style={styles.textBathroomCard}>{floor}</Text>
            </View>

            //Botão Saiba Mais
            <TouchableOpacity>
                onPress={() => {
                    navigator.navigate('LearnMoreScreen')
                }}
                style={styles.learnMoreButton}
            <Text style={styles.learnMoreButtonText}> Saiba Mais </Text>
          </TouchableOpacity>
        </View>
    )
}