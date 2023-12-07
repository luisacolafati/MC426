import { CustomError } from "../CustomError";

export class UpdateDocumentError extends CustomError {
    constructor (err: any) {
        super(`Error updating document: ${JSON.stringify(err)}`, 502)
    }
} 