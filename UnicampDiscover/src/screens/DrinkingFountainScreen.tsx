//drinkingfountainscreen
import { useEffect, useState } from 'react'; 
import { ScrollView, View, Button } from 'react-native'; 
//import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/tab.routes'; 
import 'react-native-gesture-handler';
import { DrinkingFountainCard } from '../components/DrinkingFountainCard';
import { DrinkingFountainSearchBar } from '../components/DrinkingFountainSearchBar';
import { styles } from '../styles/styles';
import { DrinkingFountainService } from '../services/firestore/DrinkingFountainService'; 
//import { CollectionNames } from '../database/CollectionNames';
import { DrinkingFountain } from '../types/DrinkingFountain';
import { InstituteNames } from "../enums/InstituteNamesEnum";


type DrinkingFountainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DrinkingFountainScreen'
>;

type DrinkingFountainScreenRoutProp = RouteProp<RootStackParamList, 'DrinkingFountainScreen'>;

type DrinkingFountainScreenProps = {
    navigation: DrinkingFountainScreenNavigationProp;
    route: DrinkingFountainScreenRoutProp;
  }

export function DrinkingFountainTabStackScreen({navigation, route}: DrinkingFountainScreenProps){

    const [search, setSearch] = useState<string>("");
    const [drinkingFountains, setDrinkingFountains] = useState<DrinkingFountain[]>([]);
    const { selectedFilters } = route.params || { selectedFilters:[]}; //Verifique se route.params é undefined
    const drinkingFountainsService = DrinkingFountainService.getInstance(); 

    function isInstitute(value: any): value is InstituteNames {
        return Object.values(InstituteNames).includes(value);
      }
    /*useEffect(() => {
        const getDrinkingFountains = async()=>{
            setDrinkingFountains(await drinkingFountainsService.getAllDocuments())
        }
        getDrinkingFountains()
    },[drinkingFountains] )*/
    useEffect(() => {
        //  console.log('useEffect acionado! Filters:', selectedFilters);
          const fetchDrinking = async (): Promise<void> => {
            try {
             // console.log('Fetching all documents...');
              const documents = await drinkingFountainsService.getAllDocuments();
            //  console.log('All documents:', documents);
        
              let filteredDrinkingFountains: DrinkingFountain[] = [];
        
              if (!selectedFilters || selectedFilters.length === 0) {
                // No filters selected, display all drinking fountains
            //    console.log('No filters selected. Displaying all drinking fountains.');
                setDrinkingFountains(documents);
              } else {
            //    console.log('Filters selected. Filtering based on selected filters...');
        
                // Check if filters include Institute
                const hasInstituteFilter = selectedFilters.some(isInstitute);
        
                if (hasInstituteFilter) {
                  // Apply only institute filter
                  const instituteFilters = selectedFilters as InstituteNames[];
                  filteredDrinkingFountains = documents.filter((drinking_fountain: DrinkingFountain) =>
                    instituteFilters.some((instituteFilter: InstituteNames) =>
                      drinking_fountain.data.instituteLocation === instituteFilter
                    )
                  );
                }
        
                setDrinkingFountains(filteredDrinkingFountains);
              }
           //   console.log('Filtered drinking fountains:', filteredDrinkingFountains);
            } catch (error) {
          //    console.error('Error fetching drinking fountains:', error);
            }
          };
        
          fetchDrinking();
        }, [selectedFilters, drinkingFountainsService]);


    const drinkingFountainCards = drinkingFountains.map((drinking_fountain, index) => {
        let icon = "water-pump";


        return (
            <DrinkingFountainCard
            key={index}
            icon={icon}
            document_data={drinking_fountain}           
            
            />
        );
    });
    
        return (
            <View style={styles.container}>
            <ScrollView style={styles.bathroomScrollView}>
              <DrinkingFountainSearchBar search={search} setSearch={setSearch} />
              <View style={styles.filterButtonContainer}>
                <Button
                  title="Filtros"
                  color="#850a0a"
                  onPress={() => navigation.navigate('DrinkingFountainFiltersScreen')}
                />
              </View>
              <View style={styles.filterCleanButton}>
                <Button
                  title="Limpar"
                  color="#090909"
                  onPress={() => {
                    navigation.setParams({selectedFilters: []});
                    setSearch('');
                  }}
                />
              </View>
              {drinkingFountainCards}
            </ScrollView>
          </View> 
        );
}