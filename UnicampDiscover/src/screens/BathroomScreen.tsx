import { useEffect, useState } from 'react'; 
import { ScrollView, View } from 'react-native'; 
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/tab.routes'; 
import 'react-native-gesture-handler';
import { BathroomCard } from '../components/BathroomCard';
import { BathroomSearchBar } from '../components/BathroomSearchBar';
import { styles } from '../styles/styles';
import { BathroomService } from '../services/firestore/BathroomService'; 
import { CollectionNames } from "../database/CollectionNames";
import { Bathroom } from "../types/Bathroom";
import { Gender } from "../enums/GenderEnum";

type BathroomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BathroomScreen'
>;

type Props = {
  navigation: BathroomScreenNavigationProp;
};

export function BathroomTabStackScreen({navigation}: Props){

   
    const [search, setSearch] = useState<string>("");
    const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
    const bathroomsService =  BathroomService.getInstance();

    useEffect(() => {
        const getBathrooms = async()=>{
            setBathrooms(await bathroomsService.getAllDocuments())
        }
        getBathrooms()
    },[] )

    const bathroomCards = bathrooms.map((bathroom) => {
        let icon = "";
        if(bathroom.data.gender === Gender.FEMALE) {
            icon = "human-female"
        } else if (bathroom.data.gender === Gender.MALE) {
            icon = "human-male"
        } else {
            icon = "human-male-female"
        }

        return (
            <BathroomCard
            icon={icon}
            location={bathroom.data.instituteLocation}
            floor={bathroom.data.floor}
            avaliacao={bathroom.data.avaliacao}
            />
        );
    });
    
        return (
            <ScrollView style={styles.bathroomScrollView}>
                <BathroomSearchBar 
                search={search}
                setSearch={setSearch}
                />
                {bathroomCards}
            </ScrollView>
        );
}