import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './src/styles/styles';
import db from './src/config/FirestoreDb';
import { DocumentData } from 'firebase/firestore/lite';
import { getAllInstitutes } from './src/services/FirestoreService';

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
    <View style={styles.container}>
      <Text>Bem vinde a nosso projeto de MC426!</Text>
    </View>
  );
}
