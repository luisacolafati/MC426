import { CollectionNames } from "../../database/CollectionNames"
import { Bathroom } from "../../types/Bathroom"
import { InstituteNames } from "../../enums/InstituteNamesEnum"
import { Gender } from '../../enums/GenderEnum'
import { InvalidParamError } from "../../errors/InvalidParamError"
import { CRUDInBatchService } from "./CRUDInBatchService"

export class BathroomService extends CRUDInBatchService {
    private static instance: any
    
    constructor () {
        super(CollectionNames.BATHROOMS)
    }

    static getInstance (): BathroomService {
        if (!this.instance) {
            this.instance = new BathroomService()
        }
        return this.instance
    }

    protected validateDocumentsData (documents: Bathroom[]): void {
        if (documents.some(doc => isNaN(doc.data.floor))) {
            throw new InvalidParamError('floor', 'number')
        }

        if (documents.some(doc => ![Gender.MALE, Gender.FEMALE, Gender.NEUTRAL].includes(doc.data.gender))) {
            throw new InvalidParamError('gender', 'MALE, FEMALE or NEUTRAL')
        }

        if (documents.some(doc => !Object.values(InstituteNames).includes(doc.data.instituteLocation))) {
            throw new InvalidParamError('instituteLocation', `${Object.values(InstituteNames).join(' or ')}`)
        }

        if (documents.some(doc => typeof doc.data.isAccessible !== 'boolean')) {
            throw new InvalidParamError('isAccessible', 'true or false')
        }
    }
}