import { CustomError } from "../CustomError";

export class DeleteDocumentError extends CustomError {
    constructor (err: any) {
        super(`Error deleting document: ${JSON.stringify(err)}`, 502)
    }
} 