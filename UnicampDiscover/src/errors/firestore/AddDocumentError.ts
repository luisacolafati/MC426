import { CustomError } from "../CustomError";

export class AddDocumentError extends CustomError {
    constructor (err: any) {
        super(`Error adding document: ${JSON.stringify(err)}`, 502)
    }
} 