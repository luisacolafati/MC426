import { CustomError } from "../CustomError";

export class GetAllDocumentsError extends CustomError {
    constructor (collectionId: string, err: any) {
        super(`Error getting all document from collection ${collectionId}: ${JSON.stringify(err)}`, 502)
    }
} 