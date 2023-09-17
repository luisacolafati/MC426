import React from 'react';
import {View, Text, TextInput} from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';

export function BathroomSearchBar ({ search, setSearch}: { search: string, setSearch: (text: string) => void}) {
    return(
        <View style={styles.bathroomSearch}>
            <Icon name="search" size={20}></Icon>
            <TextInput
                style={styles.bathroomTextInput}
                placeholder="Encontre um banheiro"
                value={search}
                onChangeText={(text) => setSearch(text)}/>
        </View>
    )
}