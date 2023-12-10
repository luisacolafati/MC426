import React, { useEffect, useState } from 'react';
//import { View } from 'react-native';
import { getAllInstitutes } from './src/services/FirestoreService';
import { DocumentData } from 'firebase/firestore/lite';
//import { styles } from './src/styles/styles';
import { TabRoutes } from './src/routes/tab.routes';
import { StackRoutes } from './src/routes/stack.routes';

import { NavigationContainer } from '@react-navigation/native';

import { styles } from './src/styles/styles';

export default function App() {
    const [institutes, setInstitutes] = useState<DocumentData[] | null>(null)
    
    async function getInstitutes() {
        const institutes = await getAllInstitutes();
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
