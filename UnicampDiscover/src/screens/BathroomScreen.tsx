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

  useEffect(() => {
    const getBathrooms = async (): Promise<void> => {
      try {
        if (bathrooms.length === 0) {
          const documents = await bathroomsService.getAllDocuments();
          setBathrooms(documents);
        }

        let filteredBathrooms: Bathroom[] = [];

        if (selectedFilters.length === 0) {
          // No filters selected, get all bathrooms
          filteredBathrooms = bathrooms;
        } else {
          // Filters selected, filter based on selected filters
          filteredBathrooms = bathrooms.filter((bathroom: Bathroom) =>
            selectedFilters.every((filter: Gender | Institutes) => {
              if (isGender(filter)) {
                return bathroom.data.gender === filter;
              } else if (isInstitute(filter)) {
                return bathroom.data.instituteLocation === filter;
              }
              return true; // No match, keep the bathroom
            })
          );
        }

        setBathrooms(filteredBathrooms);
      } catch (error) {
        console.error('Error fetching bathrooms:', error);
      }
    };

    getBathrooms();
  }, [selectedFilters, bathrooms, bathroomsService]);

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
