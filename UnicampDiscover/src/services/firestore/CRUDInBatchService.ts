import { BathroomDTO } from "../../dtos/BathroomDTO"
import { DrinkingFountainDTO } from "../../dtos/DrinkingFountainDTO"
import { MissingParamError } from "../../errors/MissingParamError"
import { FirestoreService } from "./FirestoreService"

export abstract class CRUDInBatchService extends FirestoreService {
    protected abstract validateDocumentsData (documents: BathroomDTO[] | DrinkingFountainDTO[]): void
    
    protected async validateDocumentsIds (documents: BathroomDTO[] | DrinkingFountainDTO[]): Promise<void> {
        const allDocumentsInCollection = await this.getAllDocuments()
        const idsOfAllDocumentsInCollection = allDocumentsInCollection.map(doc => doc.id)
        if (documents.some(doc => !idsOfAllDocumentsInCollection.includes(doc.id))) {
            throw new MissingParamError('id', 'string')
        }
    }

    async addDocumentsInBatch (documents: BathroomDTO[] | DrinkingFountainDTO[]): Promise<void> {
        this.validateDocumentsData(documents)
        
        await Promise.all(documents.map(async (doc) => {
            await this.addDocument(doc)
        }))
    }

    async updateDocumentsInBatch (documents: BathroomDTO[]  | DrinkingFountainDTO[]): Promise<void> {
        this.validateDocumentsIds(documents)
        this.validateDocumentsData(documents)
        
        await Promise.all(documents.map(async (doc) => {
            await this.updateDocument(doc)
        }))
    }

    async deleteDocumentsInBatch (documents: BathroomDTO[] | DrinkingFountainDTO[]): Promise<void> {
        this.validateDocumentsIds(documents)
        
        await Promise.all(documents.map(async (doc) => {
            await this.deleteDocument(doc)
        }))
    }
}