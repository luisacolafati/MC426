import { useState } from 'react'; 
import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'; 
import { styles } from '../styles/styles';
import { SearchBar } from '@rneui/themed';
import { Searchbar } from 'react-native-paper';


const image = {uri: 'https://www.cle.unicamp.br/trendsxvi/images/sys/mapa.png'};
// const [search, setSearch] = useState("");
// type SearchBarComponentProps = {};
//     const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = () => {
//         const [search, setSearch] = useState("");
        
//         const updateSearch = (search: React.SetStateAction<string>) => {
//           setSearch(search);
//         };
//     }
const MyComponent = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
  
    return (
      <Searchbar
        iconColor = "#850a0a"
        placeholder="Search"
        placeholderTextColor={'#850a0a'}
        onChangeText={onChangeSearch}
        value={searchQuery}
        
      />
    );
  };
  
  export default MyComponent;
export function MapScreen( ){
    
    
    return (
        <SafeAreaView style={styles.container}>
            
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
               
                <MyComponent></MyComponent>
            </ImageBackground>
            
        </SafeAreaView>
        
        
    );
}