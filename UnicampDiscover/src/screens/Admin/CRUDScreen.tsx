import { Text, View, Alert, ScrollView } from "react-native"
import { styles } from './styles/styles'
import { RadioButton } from 'react-native-paper'
import { useEffect, useState } from "react"
import { CollectionNames } from "../../database/CollectionNames"
import { CSVFilePickerButton } from "../../components/CSVFilePickerButton"
import { CRUDOperations } from "../../enums/CRUDOperationsEnum"
import { CRUDInBatchService } from "../../services/firestore/CRUDInBatchService"
import { BathroomService } from "../../services/firestore/BathroomService"
import { DrinkingFountainService } from "../../services/firestore/DrinkingFountainService"
import { BathroomDTO } from "../../dtos/BathroomDTO"
import { DrinkingFountainDTO } from "../../dtos/DrinkingFountainDTO"

const CSVFileInstructionsByCollectionAndOperation = {
    [CollectionNames.BATHROOMS]: {
        [CRUDOperations.INSERT]: 'Seu arquivo deve conter as colunas: id (vazia), instituteLocation (string), floor (number), gender (MALE, FEMALE ou NEUTRAL) e isAccessible (TRUE ou FALSE)',
        [CRUDOperations.UPDATE]: 'Seu arquivo deve conter as colunas: id (string), instituteLocation (string), floor (number), gender (MALE, FEMALE ou NEUTRAL) e isAccessible (TRUE ou FALSE)',
        [CRUDOperations.DELETE]: 'Seu arquivo só precisa conter a coluna id (string)'
    },
    [CollectionNames.DRINKING_FOUNTAIN]: {
        [CRUDOperations.INSERT]: 'Seu arquivo deve conter as seguintes colunas: id (vazia), instituteLocation (string) e floor (number)',
        [CRUDOperations.UPDATE]: 'Seu arquivo deve conter as seguintes colunas: id (string), instituteLocation (string) e floor (number)',
        [CRUDOperations.DELETE]: 'Seu arquivo só precisa conter a coluna id (string)'
    }
}

export default function CRUDScreen () {
    const [collection, setCollection] = useState<string>(CollectionNames.BATHROOMS)
    const [operation, setOperation] = useState<string>(CRUDOperations.INSERT)
    const [fileContent, setFileContent] = useState<BathroomDTO[] | DrinkingFountainDTO[]>([])
    
    const getCollectionNameInPortuguese = (collection: string): string => {
        return collection === CollectionNames.BATHROOMS ? 'banheiros' : 'bebedouros'
    }

    const getCRUDServiceByCollection = (collection: string): CRUDInBatchService => {
        return collection === CollectionNames.BATHROOMS ? BathroomService.getInstance() : DrinkingFountainService.getInstance()
    }

    useEffect(() => {
        const executeCRUDOperation = async (): Promise<void> => {
            const CRUDService = getCRUDServiceByCollection(collection)

            switch (operation) {
                case CRUDOperations.INSERT:
                    return await CRUDService.addDocumentsInBatch(fileContent)
                case CRUDOperations.UPDATE:
                    return await CRUDService.updateDocumentsInBatch(fileContent)
                case CRUDOperations.DELETE:
                    return await CRUDService.deleteDocumentsInBatch(fileContent)
            }
        }

        if (fileContent.length > 0) {
            Alert.alert(
                'Atenção',
                `Já lemos seu arquivo!\n\nPodemos seguir com a ${operation} de ${getCollectionNameInPortuguese(collection)}?`,
                [
                    {
                        text: 'Não',
                        onPress: () => console.log('Desistência de manipulação do banco de dados')
                    },
                    {
                        text: 'Sim',
                        onPress: () => executeCRUDOperation()
                                        .then(() => {
                                            Alert.alert(
                                                'Sucesso',
                                                `Banco de dados atualizado!`
                                            )
                                        })
                                        .catch((err: { message: string }) => {
                                            Alert.alert(
                                                'Erro',
                                                `Infelizmente, não foi possível efetivar a ${operation} solicitada: ${err.message}`
                                            )
                                        })
                    }
                ]
            )
        }
    }, [fileContent])

    return (
        <ScrollView>
            <View
            style={styles.pageView}>
                <View>
                    <Text style={styles.pageTitle}>Manipulação do Banco de Dados</Text>
                    <View
                    style={styles.infoCardView}
                    >
                        <Text style={styles.infoCardText}>Aqui, você poderá inserir, alterar ou excluir dados de banheiros e bebedouros em lote a partir da seleção de um arquivo .csv</Text>
                    </View>
                </View>

                <View
                style={styles.radioButtonView}
                >
                    <Text>Escolha o item a ser manipulado:</Text>
                    <RadioButton.Group
                        onValueChange={(value) => setCollection(value)}
                        value={collection}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={CollectionNames.BATHROOMS} />
                            <Text>Banheiros</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={CollectionNames.DRINKING_FOUNTAIN} />
                            <Text>Bebedouros</Text>
                        </View>
                    </RadioButton.Group>
                </View>
                
                <View
                style={styles.radioButtonView}
                >
                    <Text>Escolha a operação a ser realizada:</Text>
                    <RadioButton.Group
                        onValueChange={(value) => setOperation(value)}
                        value={operation}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={CRUDOperations.INSERT} />
                            <Text>Inserção</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={CRUDOperations.UPDATE} />
                            <Text>Atualização</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={CRUDOperations.DELETE} />
                            <Text>Exclusão</Text>
                        </View>
                    </RadioButton.Group>
                </View>

                <View
                    style={styles.infoCardView}
                    >
                        <Text style={styles.infoCardText}>Atenção! {(CSVFileInstructionsByCollectionAndOperation as any)[collection][operation]}</Text>
                </View>
                
                <CSVFilePickerButton
                    setFileContent={setFileContent}
                />
            </View>
        </ScrollView>
    )
}