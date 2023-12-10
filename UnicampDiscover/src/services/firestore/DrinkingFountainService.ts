import { CollectionNames } from "../../database/CollectionNames"
import { DrinkingFountainDTO } from "../../dtos/DrinkingFountainDTO"
import { Institutes } from "../../enums/InstitutesEnum"
import { InvalidParamError } from "../../errors/InvalidParamError"
import { CRUDInBatch } from "./CRUDInBatch"

export class DrinkingFountainService extends CRUDInBatch {
    constructor (collectionName: CollectionNames) {
        super(collectionName)
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