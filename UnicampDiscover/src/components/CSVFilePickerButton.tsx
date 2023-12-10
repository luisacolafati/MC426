import * as DocumentPicker from 'expo-document-picker';
import { Dispatch, SetStateAction } from 'react';
import { View, Button, Alert } from 'react-native';
import { FileService } from '../services/files/FileService';
import { BathroomDTO } from '../dtos/BathroomDTO';
import { DrinkingFountainDTO } from '../dtos/DrinkingFountainDTO';

export function CSVFilePickerButton ({ setFileContent }: { setFileContent: Dispatch<SetStateAction<BathroomDTO[] | DrinkingFountainDTO[]>> }) {
  const fileService = FileService.getInstance()  
  
  const pickCSVFileAndReadContent = async () => {
        try {
          const filePicked = await DocumentPicker.getDocumentAsync({
            type: 'text/csv'
          })

          const fileUri = filePicked?.assets ? filePicked.assets[0].uri : ''
          
          if (fileUri) {
            const fileContent = await fileService.readCSVFileFromUri(fileUri)
            setFileContent(fileContent)
          } else {
            throw new Error('No file uri was found')
          }
        } catch (err) {
          console.log(`Error picking document: ${JSON.stringify(err)}`)
          Alert.alert(
            'Erro',
            'Não foi possível ler seu arquivo. Por favor, tente selecioná-lo novamente! Se o problema persistir, entre em contato com os mantenedores do projeto'
          )
        }
    }

    return (
      <View>
          <Button
              title='Selecione um arquivo .csv'
              onPress={pickCSVFileAndReadContent}
          />
      </View>
    )
}
