import { useEffect, useState } from 'react';
import { getAllInstitutes } from './src/services/FirestoreService';
import { DocumentData } from 'firebase/firestore/lite';
import { TabRoutes } from './src/routes/tab.routes';
import { NavigationContainer } from '@react-navigation/native';
import db from './src/config/FirestoreDb';

export default function App() {
    const [institutes, setInstitutes] = useState<DocumentData[] | null>(null)
    
    async function getInstitutes() {
        const institutes = await getAllInstitutes(db);
        setInstitutes(institutes);
        console.log("institutes => ", JSON.stringify(institutes));
    }

  useEffect(() => {
      getInstitutes();
  }, []);

  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}
