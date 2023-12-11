// LearnMoreScreen.tsx
import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { styles } from '../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../routes/tab.routes'; 
import { RouteProp } from '@react-navigation/native';


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
    const { location, floor } = route.params;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Learn More screen</Text>
          <Text>Location: {location}</Text>
          <Text>Floor: {floor}</Text>
          <Button
            title="Voltar"
            onPress={() => navigation.navigate('BathroomScreen')}
          />
        </View>
      );
}
