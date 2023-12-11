import * as DocumentPicker from 'expo-document-picker';
import { Dispatch, SetStateAction } from 'react';
import { View, Button } from 'react-native';

export function CSVFilePickerButton ({ setFileUri }: { setFileUri: Dispatch<SetStateAction<string>> }) {
    const pickCSVFile = async () => {
        try {
          const filePicked = await DocumentPicker.getDocumentAsync({
            type: 'text/csv'
          })
          setFileUri(filePicked?.assets ? filePicked.assets[0].uri : '')
        } catch (err) {
          console.log(`Error picking document: ${JSON.stringify(err)}`)
        }
    }

    return (
      <View>
          <Button
              title='Selecione um arquivo .csv'
              onPress={pickCSVFile}
          />
      </View>
    )
}
