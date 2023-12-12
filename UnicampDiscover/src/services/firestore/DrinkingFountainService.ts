import { CollectionNames } from "../../database/CollectionNames"
import { DrinkingFountainDTO } from "../../types/DrinkingFountain"
import { Institutes } from "../../enums/InstitutesEnum"
import { InvalidParamError } from "../../errors/InvalidParamError"
import { CRUDInBatchService } from "./CRUDInBatchService"

export class DrinkingFountainService extends CRUDInBatchService {
    private static instance: any
    
    constructor () {
        super(CollectionNames.DRINKING_FOUNTAIN)
    }

    static getInstance (): DrinkingFountainService {
        if (!this.instance) {
            this.instance = new DrinkingFountainService()
        }
        return this.instance
    }

    protected validateDocumentsData (documents: DrinkingFountainDTO[]): void {
        if (documents.some(doc => isNaN(doc.data.floor))) {
            throw new InvalidParamError('floor', 'number')
        }

        if (documents.some(doc => Object.values(Institutes).includes(doc.data.instituteLocation))) {
            throw new InvalidParamError('instituteLocation', `${Object.values(Institutes).join(' or ')}`)
        }
    }
}