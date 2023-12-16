
import { useEffect, useState } from 'react'; 
import { ScrollView, View, Button} from 'react-native'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/tab.routes'; 
import 'react-native-gesture-handler';
import { BathroomCard } from '../components/BathroomCard';
import { BathroomSearchBar } from '../components/BathroomSearchBar';
import { styles } from '../styles/styles';
import { BathroomService } from '../services/firestore/BathroomService'; 
import { Bathroom } from "../types/Bathroom";
import { Gender } from "../enums/GenderEnum";
import { InstituteNames } from "../enums/InstituteNamesEnum";



type BathroomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BathroomScreen'
>;

type BathroomScreenRouteProp = RouteProp<RootStackParamList, 'BathroomScreen'>;

type BathroomScreenProps = {
  navigation: BathroomScreenNavigationProp;
  route: BathroomScreenRouteProp;
  bathroomService: BathroomService // BathroomService como propriedade
}

export const BathroomTabStackScreen: React.FC<BathroomScreenProps> = ({ navigation, route }) =>{
  const [search, setSearch] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
  const { filters } = route.params || { filters:[]}; //Verifique se route.params é undefined
  //const bathroomsService = BathroomService.getInstance();

  function isGender(value: any): value is Gender {
    return Object.values(Gender).includes(value);
  }

  function isInstitute(value: any): value is InstituteNames {
    return Object.values(InstituteNames).includes(value);
  }

  const genderFilter = (documents: Bathroom[], filters: (Gender | InstituteNames)[]): Bathroom[] => {
    const genderFilters = filters as Gender[];
    return documents.filter((bathroom: Bathroom) =>
      genderFilters.some((genderFilter: Gender) =>
        bathroom.data.gender === genderFilter
      )
    );
  };
  
  const instituteFilter = (documents: Bathroom[], filters: (Gender | InstituteNames)[]): Bathroom[] => {
    const instituteFilters = filters as InstituteNames[];
    return documents.filter((bathroom: Bathroom) =>
      instituteFilters.some((instituteFilter: InstituteNames) =>
        bathroom.data.instituteLocation === instituteFilter
      )
    );
  };
  
  const combinedFilter = (documents: Bathroom[], filters: (Gender | InstituteNames)[]): Bathroom[] => {
    const genderFilters = filters.filter(isGender) as Gender[];
    const instituteFilters = filters.filter(isInstitute) as InstituteNames[];
  
    return documents.filter((bathroom: Bathroom) =>
      genderFilters.some((genderFilter: Gender) =>
        bathroom.data.gender.toLowerCase() === genderFilter.toLowerCase()
      ) &&
      instituteFilters.some((instituteFilter: InstituteNames) =>
        bathroom.data.instituteLocation.toLowerCase() === instituteFilter.toLowerCase()
      )
    );
  };

useEffect(() => {
  const fetchData = async (): Promise<void> => {
    try {
      const bathroomsService = BathroomService.getInstance();
      const documents = await bathroomsService.getAllDocuments();

      let filteredBathrooms: Bathroom[] = [];
  
      if (!filters || filters.length === 0) {
        setBathrooms(documents);
      } else {
        const hasGenderFilter = filters.some(isGender);
        const hasInstituteFilter = filters.some(isInstitute);
  
        if (hasGenderFilter && hasInstituteFilter) {
          filteredBathrooms = combinedFilter(documents, filters);

        } else if (hasGenderFilter) {
          filteredBathrooms = genderFilter(documents, filters);
        } else if (hasInstituteFilter) {
          filteredBathrooms = instituteFilter(documents, filters);
        }
  
        setBathrooms(filteredBathrooms);
      }
    } catch (error) {
      // console.error('Error fetching bathrooms:', error);
    }
  };
  

  fetchData();
}, [filters]);


  const bathroomCards = bathrooms.map((bathroom: Bathroom) => {
    let icon = "";
    if (bathroom.data.gender === Gender.FEMALE) {
      icon = "human-female";
    } else if (bathroom.data.gender === Gender.MALE) {
      icon = "human-male";
    } else {
      icon = "human-male-female";
    }

    return (
      <BathroomCard
        key={bathroom.id}
        icon={icon}
        document_data={bathroom}
      />
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.bathroomScrollView}>
        <BathroomSearchBar search={search} setSearch={setSearch} />
        <View style={styles.filterButtonContainer}>
          <Button
            title="Filtros"
            color="#850a0a"
            onPress={() => navigation.navigate('BathroomFiltersScreen')}
          />
        </View>
        <View style={styles.filterCleanButton}>
          <Button
            title="Limpar"
            color="#090909"
            onPress={() => {
              navigation.setParams({filters: []});
              setSearch('');
            }}
          />
        </View>
        {bathroomCards}
      </ScrollView>
    </View>
  );
}
