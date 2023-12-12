import { CustomError } from "../CustomError";

export class CreateFileError extends CustomError {
    constructor (err: any) {
        super(`Error creating file: ${JSON.stringify(err)}`, 500)
    }
} 