import { TabRoutes } from './src/routes/tab.routes';
import { NavigationContainer } from '@react-navigation/native';

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
    </NavigationContainer>
  );
}