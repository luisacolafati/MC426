import * as React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native'; 
import { styles } from '../styles/styles';

const image = { uri: 'https://www.cle.unicamp.br/trendsxvi/images/sys/mapa.png' };

export function MapScreen() {    
  return (
      <SafeAreaView style={styles.container}>
          
          <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground} />
          
      </SafeAreaView>
  );
}