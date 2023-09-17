import React, { useEffect, useState } from 'react'; 
import { ScrollView, View } from 'react-native'; 
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { BathroomCard } from '../components/BathroomCard';

export function BathroomScreen(){
    const [bathrooms, setBathrooms] = useState<any[]>([]);

    useEffect(() => {
        const db = getFirestore();

        const unsubscribe = onSnapshot(collection(db, 'bathrooms'), (querySnapshot) => {
          const bathroomList: any[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            const data = documentSnapshot.data();
            bathroomList.push(data);
          });
          setBathrooms(bathroomList);
        });

    }, []);

        const bathroomCards = bathrooms.map((bathroom, index) => {
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
            bathroomCards
          );
      }