import { TabRoutes } from './src/routes/tab.routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {



  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}