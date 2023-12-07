import { CollectionNames } from "../../database/CollectionNames"
import { BathroomDTO, Gender } from "../../dtos/BathroomDTO"
import { Institutes } from "../../enums/InstitutesEnum"
import { InvalidParamError } from "../../errors/InvalidParamError"
import { CRUDInBatch } from "./CRUDInBatch"

export class BathroomService extends CRUDInBatch {
    constructor (collectionName: CollectionNames) {
        super(collectionName)
    }

    protected validateDocumentsData (documents: BathroomDTO[]): void {
        if (documents.some(doc => isNaN(doc.data.floor))) {
            throw new InvalidParamError('floor', 'number')
        }

        if (documents.some(doc => ![Gender.MALE, Gender.FEMALE, Gender.NEUTRAL].includes(doc.data.gender))) {
            throw new InvalidParamError('gender', 'MALE, FEMALE or NEUTRAL')
        }

        if (documents.some(doc => Object.values(Institutes).includes(doc.data.instituteLocation))) {
            throw new InvalidParamError('instituteLocation', `${Object.values(Institutes).join(' or ')}`)
        }

        if (documents.some(doc => !['true', 'false'].includes(doc.data.isAccessible.toString()))) {
            throw new InvalidParamError('isAccessible', 'true or false')
        }
    }
}