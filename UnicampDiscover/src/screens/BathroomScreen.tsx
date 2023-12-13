import { useEffect, useState } from 'react'; 
import { ScrollView, View, Button} from 'react-native'; 
import { getFirestore, collection, onSnapshot, query, where,getDocs } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/tab.routes'; 
import 'react-native-gesture-handler';
import { BathroomCard } from '../components/BathroomCard';
import { BathroomSearchBar } from '../components/BathroomSearchBar';
import { styles } from '../styles/styles';
import { BathroomService } from '../services/firestore/BathroomService'; 
import { CollectionNames } from "../database/CollectionNames";
import { Bathroom } from "../types/Bathroom";
import { Gender } from "../enums/GenderEnum";
import { Institutes } from "../enums/InstitutesEnum";



type BathroomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BathroomScreen'
>;

type BathroomScreenRouteProp = RouteProp<RootStackParamList, 'BathroomScreen'>;

type BathroomScreenProps = {
  navigation: BathroomScreenNavigationProp;
  route: BathroomScreenRouteProp;
}

export function BathroomTabStackScreen({ navigation, route }: BathroomScreenProps) {
  const [search, setSearch] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
  const { filters } = route.params || { filters:[]}; //Verifique se route.params é undefined
  const bathroomsService = BathroomService.getInstance();

  function isGender(value: any): value is Gender {
    return Object.values(Gender).includes(value);
  }

  function isInstitute(value: any): value is Institutes {
    return Object.values(Institutes).includes(value);
  }



useEffect(() => {
//  console.log('useEffect acionado! Filters:', filters);
  const fetchData = async (): Promise<void> => {
    try {
     // console.log('Fetching all documents...');
      const documents = await bathroomsService.getAllDocuments();
    //  console.log('All documents:', documents);

      let filteredBathrooms: Bathroom[] = [];

      if (!filters || filters.length === 0) {
        // No filters selected, display all bathrooms
    //    console.log('No filters selected. Displaying all bathrooms.');
        setBathrooms(documents);
      } else {
    //    console.log('Filters selected. Filtering based on selected filters...');

        // Check if filters include Gender
        const hasGenderFilter = filters.some(isGender);

        // Check if filters include Institute
        const hasInstituteFilter = filters.some(isInstitute);

        if (hasGenderFilter && hasInstituteFilter) {
          // Separate gender and institute filters
          const genderFilters = filters.filter(isGender) as Gender[];
          const instituteFilters = filters.filter(isInstitute) as Institutes[];

          // Apply combined filters
          filteredBathrooms = documents.filter((bathroom: Bathroom) =>
            genderFilters.some((genderFilter: Gender) =>
              bathroom.data.gender.toLowerCase() === genderFilter.toLowerCase()
            ) &&
            instituteFilters.some((instituteFilter: Institutes) =>
              bathroom.data.instituteLocation.toLowerCase() === instituteFilter.toLowerCase()
            )
          );
        } else if (hasGenderFilter) {
          // Apply only gender filter
          const genderFilters = filters as Gender[];
          filteredBathrooms = documents.filter((bathroom: Bathroom) =>
            genderFilters.some((genderFilter: Gender) =>
              bathroom.data.gender === genderFilter
            )
          );
        } else if (hasInstituteFilter) {
          // Apply only institute filter
          const instituteFilters = filters as Institutes[];
          filteredBathrooms = documents.filter((bathroom: Bathroom) =>
            instituteFilters.some((instituteFilter: Institutes) =>
              bathroom.data.instituteLocation === instituteFilter
            )
          );
        }

        setBathrooms(filteredBathrooms);
      }

   //   console.log('Filtered bathrooms:', filteredBathrooms);
    } catch (error) {
  //    console.error('Error fetching bathrooms:', error);
    }
  };

  fetchData();
}, [filters, bathroomsService]);

// ...


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
        location={bathroom.data.instituteLocation}
        floor={bathroom.data.floor}
        avaliacao={bathroom.data.avaliacao}
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
