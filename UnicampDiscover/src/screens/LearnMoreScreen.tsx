// LearnMoreScreen.tsx
import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from '../styles/styles';


export function LearnMoreScreen({ navigation }){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home screen</Text>
            <Button
                title="Voltar"
                onPress={() => navigation.navigate('BathroomScreen')}
            />
    </View>
    );
}
