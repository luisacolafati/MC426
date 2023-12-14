import { CollectionNames } from "../../database/CollectionNames"
import { DrinkingFountain } from "../../types/DrinkingFountain"
import { InstituteNames } from "../../enums/InstituteNamesEnum"
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

    protected validateDocumentsData (documents: DrinkingFountain[]): void {
        if (documents.some(doc => isNaN(doc.data.floor))) {
            throw new InvalidParamError('floor', 'number')
        }

        if (documents.some(doc => Object.values(InstituteNames).includes(doc.data.instituteLocation))) {
            throw new InvalidParamError('instituteLocation', `${Object.values(InstituteNames).join(' or ')}`)
        }
    }
}