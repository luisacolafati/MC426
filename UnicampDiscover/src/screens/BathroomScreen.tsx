import React, { useEffect, useState } from 'react'; 
import { ScrollView, View } from 'react-native'; 
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { BathroomCard } from '../components/BathroomCard';
import { BathroomSearchBar } from '../components/BathroomSearchBar';
import { styles } from '../styles/styles';

export function BathroomScreen(){
    const [bathrooms, setBathrooms] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const db = getFirestore();
        const q = collection(db, 'bathrooms');

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const bathroomList: any[] = [];
            querySnapshot.forEach((documentSnapshot) => {
                const data = documentSnapshot.data();
                bathroomList.push(data);
            });
            setBathrooms(bathroomList);
        });
        return () => unsubscribe();
    }, []);

    const filteredBathrooms = bathrooms.filter((bathroom) =>
        bathroom.location.toLowerCase().includes(search.toLowerCase())
    );

    const bathroomCards = filteredBathrooms.map((bathroom, index) => {
        let icon = "";
        if(bathroom.gender === "feminino") {
            icon = "human-female"
        } else if (bathroom.gender === "masculino") {
            icon = "human-male"
        } else {
            icon = "human-male-female"
        }

        return (
            <BathroomCard
            key={index}
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