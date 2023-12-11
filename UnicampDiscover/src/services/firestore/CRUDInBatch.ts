import { BathroomDTO } from "../../dtos/BathroomDTO"
import { DrinkingFountainDTO } from "../../dtos/DrinkingFountainDTO"
import { MissingParamError } from "../../errors/MissingParamError"
import { FirestoreService } from "./FirestoreService"

export abstract class CRUDInBatch extends FirestoreService {
    protected abstract validateDocumentsData (documents: BathroomDTO[] | DrinkingFountainDTO[]): void
    
    protected validateDocumentsIds (documents: BathroomDTO[] | DrinkingFountainDTO[]): void {
        if (documents.some(doc => !doc.id)) {
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