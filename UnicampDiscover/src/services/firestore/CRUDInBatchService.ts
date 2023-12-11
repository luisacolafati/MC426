import { Bathroom } from "../../types/Bathroom"
import { DrinkingFountain } from "../../types/DrinkingFountain"
import { MissingParamError } from "../../errors/MissingParamError"
import { FirestoreService } from "./FirestoreService"

export abstract class CRUDInBatchService extends FirestoreService {
    protected abstract validateDocumentsData (documents: Bathroom[] | DrinkingFountain[]): void
    
    protected async validateDocumentsIds (documents: Bathroom[] | DrinkingFountain[]): Promise<void> {
        const allDocumentsInCollection = await this.getAllDocuments()
        const idsOfAllDocumentsInCollection = allDocumentsInCollection.map(doc => doc.id)
        if (documents.some(doc => !idsOfAllDocumentsInCollection.includes(doc.id))) {
            throw new MissingParamError('id', 'string')
        }
    }

    async addDocumentsInBatch (documents: Bathroom[] | DrinkingFountain[]): Promise<void> {
        this.validateDocumentsData(documents)
        
        await Promise.all(documents.map(async (doc) => {
            await this.addDocument(doc)
        }))
    }

    async updateDocumentsInBatch (documents: Bathroom[]  | DrinkingFountain[]): Promise<void> {
        this.validateDocumentsIds(documents)
        this.validateDocumentsData(documents)
        
        await Promise.all(documents.map(async (doc) => {
            await this.updateDocument(doc)
        }))
    }

    async deleteDocumentsInBatch (documents: Bathroom[] | DrinkingFountain[]): Promise<void> {
        this.validateDocumentsIds(documents)
        
        await Promise.all(documents.map(async (doc) => {
            await this.deleteDocument(doc)
        }))
    }
}