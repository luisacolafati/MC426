import { CollectionNames } from "../../database/CollectionNames"
import { FirestoreService } from "./FirestoreService"

export class InstitutesService extends FirestoreService {
    private static instance: any

    constructor () {
        super(CollectionNames.INSTITUTES)
    }

    static getInstance (): InstitutesService {
        if (!this.instance) {
            this.instance = new InstitutesService
        }
        return this.instance
    }
}
