import { TabRoutes } from './src/routes/tab.routes';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { CSVFilePickerButton } from './src/components/CSVFilePickerButton';
import { FileService } from './src/services/files/FileService';
import { FirestoreService } from './src/services/firestore/FirestoreService';

export default function App() {
  const [fileUri, setFileUri] = useState('')
  const fileService = new FileService()

  // useEffect for test
  useEffect(() => {
    const firestoreService = new FirestoreService('bathrooms')
    firestoreService.addDocument({ id: '', data: { instituteLocation: "IG" } })
  }, [])

  useEffect(() => {
    fileService.readCSVFileFromUri(fileUri)
  }, [fileUri])

  return (
    <NavigationContainer>
      <TabRoutes />
      <CSVFilePickerButton
        setFileUri={setFileUri}
      />
    </NavigationContainer>
  );
}
