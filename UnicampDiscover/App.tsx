import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getAllInstitutes } from './src/services/FirestoreService';
import { DocumentData } from 'firebase/firestore/lite';
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
    <View style={styles.container}>
      <Text>Bem vinde a nosso projeto de MC426!</Text>
    </View>
  );
}
