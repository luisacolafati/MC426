import dbPointToEmulator from "../../config/FirestoreEmulatorDb"
import { doc, getDocs, setDoc, deleteDoc, collection } from "firebase/firestore"
import { getAllInstitutes } from "../FirestoreService"

const clearCollection = async (collectionName: string): Promise<void> => {
    const querySnapshot = await getDocs(collection(dbPointToEmulator, collectionName))
    querySnapshot.docChanges().forEach((docData) => deleteDoc(doc(dbPointToEmulator, collectionName, docData.doc.id)))
}

describe('FirestoreService', () => {
    describe('getAllInstitutes', () => {
        const sut = getAllInstitutes
        const institutesCollectionName = 'institute'

        beforeEach(async () => {
            await clearCollection(institutesCollectionName)
        })

        it('Should return an empty list when no institute is register', async () => {
            const result = await sut(dbPointToEmulator)

            expect(result).toStrictEqual([])
        })

        it('Should return one document when it is the only register in institute collection', async () => {
            const mockedDocumentId = 'abc1234'
            const mockedDocumentData = {
                name: 'Instituto de Computação 3',
                bathroom: [
                    {
                        floor: 1,
                        gender: 'FEMININO'
                    }
                ]
            }
            await setDoc(doc(dbPointToEmulator, institutesCollectionName, mockedDocumentId), mockedDocumentData)
            
            const result = await sut(dbPointToEmulator)

            expect(result).toStrictEqual([mockedDocumentData])
        })

        it('Should return multiple documents when they are all register in institute collection', async () => {
            const mockedFirstDocumentId = 'abc1234'
            const mockedSecondDocumentId = 'abc1235'
            const mockedFirstDocumentData = {
                name: 'Instituto de Computação 3',
                bathroom: [
                    {
                        floor: 1,
                        gender: 'FEMININO'
                    }
                ]
            }
            const mockedSecondDocumentData = {
                name: 'Instituto de Computação 3',
                bathroom: [
                    {
                        floor: 1,
                        gender: 'MASCULINO'
                    }
                ]
            }
            await setDoc(doc(dbPointToEmulator, institutesCollectionName, mockedFirstDocumentId), mockedFirstDocumentData)
            await setDoc(doc(dbPointToEmulator, institutesCollectionName, mockedSecondDocumentId), mockedSecondDocumentData)
            
            const result = await sut(dbPointToEmulator)

            expect(result).toStrictEqual([mockedFirstDocumentData, mockedSecondDocumentData])
        })
    })
})
