import { useEffect, useState } from 'react'; 
import { ScrollView, View } from 'react-native'; 
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/tab.routes'; 
import 'react-native-gesture-handler';
import { DrinkingFountainCard } from '../components/DrinkingFountainCard';
import { DrinkingFountainSearchBar } from '../components/DrinkingFountainSearchBar';
import { styles } from '../styles/styles';
import { DrinkingFountainService } from '../services/firestore/DrinkingFountainService'; 
import { CollectionNames } from '../database/CollectionNames';
import { DrinkingFountainDTO } from '../dtos/DrinkingFountainDTO';


type DrinkingFountainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DrinkingFountainScreen'
>;

type Props = {
  navigation: DrinkingFountainScreenNavigationProp;
};

export function DrinkingFountainTabStackScreen({navigation}: Props){

    const [search, setSearch] = useState<string>("");
    const [drinkingFountains, setDrinkingFountains] = useState<DrinkingFountainDTO[]>([]);
    const drinkingFountainsService = new DrinkingFountainService(CollectionNames.DRINKING_FOUNTAIN); 

    useEffect(() => {
        const getDrinkingFountains = async()=>{
            setDrinkingFountains(await drinkingFountainsService.getAllDocuments())
        }
        getDrinkingFountains()
    },[] )

    const drinkingFountainCards = drinkingFountains.map((drinking_fountain, index) => {
        let icon = "water-pump";

        return (
            <DrinkingFountainCard
            key={index}
            icon={icon}
            location={drinking_fountain.data.instituteLocation}
            floor={drinking_fountain.data.floor}
            />
        );
    });
    
        return (
            <ScrollView style={styles.bathroomScrollView}>
                <DrinkingFountainSearchBar 
                search={search}
                setSearch={setSearch}
                />
                {drinkingFountainCards}
            </ScrollView>
        );
}