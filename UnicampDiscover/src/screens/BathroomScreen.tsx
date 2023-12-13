import { useEffect, useState } from 'react'; 
import { ScrollView, View } from 'react-native'; 
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/tab.routes'; 
import 'react-native-gesture-handler';
import { BathroomCard } from '../components/BathroomCard';
import { BathroomSearchBar } from '../components/BathroomSearchBar';
import { styles } from '../styles/styles';

export function BathroomScreen(){
    const [bathrooms, setBathrooms] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const getBathrooms = async()=>{
            setBathrooms(await bathroomsService.getAllDocuments())
        }
        getBathrooms()
    },[] )

    const bathroomCards = filteredBathrooms.map((bathroom, index) => {
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
            location={bathroom.location}
            address={bathroom.address}
            floor={bathroom.floor}
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