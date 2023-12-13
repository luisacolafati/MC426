import { useEffect, useState } from 'react'; 
import { ScrollView, View, Button} from 'react-native'; 
import { getFirestore, collection, onSnapshot, query, where,getDocs } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
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

type Props = {
  navigation: BathroomScreenNavigationProp;
};

export function BathroomTabStackScreen({ navigation }: Props) {
  const [search, setSearch] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<(Gender | Institutes)[]>([]);
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
  const bathroomsService = BathroomService.getInstance();

  function isGender(value: any): value is Gender {
    return Object.values(Gender).includes(value);
  }

  function isInstitute(value: any): value is Institutes {
    return Object.values(Institutes).includes(value);
  }

    const fetchData = async (): Promise<void> => {
      try {
        console.log('Fetching all documents...');
        const documents = await bathroomsService.getAllDocuments();
        console.log('All documents:', documents);

        let filteredBathrooms: Bathroom[] = [];

        if (selectedFilters.length === 0) {
          // No filters selected, display all bathrooms
          console.log('No filters selected. Displaying all bathrooms.');
          setBathrooms(documents);
        } else {
          console.log('Filters selected. Filtering based on selected filters...');
          // Filters selected, filter based on selected filters
          filteredBathrooms = documents.filter((bathroom: Bathroom) =>
            selectedFilters.some((filter: Gender | Institutes) => {
              if (isGender(filter)) {
                console.log('Banheiro encontrado:', bathroom.data.instituteLocation);
                console.log('Gender:', bathroom.data.gender);
                return bathroom.data.gender === filter;
              } else if (isInstitute(filter)) {
                console.log('Banheiro encontrado:', bathroom.data.instituteLocation);
                console.log('Institute:', bathroom.data.instituteLocation);
                return bathroom.data.instituteLocation === filter;
              }
              return false; // No match, keep the bathroom
            })
          );
          setBathrooms(filteredBathrooms);
        }

        console.log('Filtered bathrooms:', filteredBathrooms);
      } catch (error) {
        console.error('Error fetching bathrooms:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [selectedFilters]);





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
              setSelectedFilters([]);
              setSearch('');
            }}
          />
        </View>
        {bathroomCards}
      </ScrollView>
    </View>
  );
}
