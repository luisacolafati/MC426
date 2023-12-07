import { CustomError } from "../CustomError";

export class ReadFileError extends CustomError {
    constructor (fileUri: string, err: any) {
        super(`Error reading file from uri ${fileUri}: ${JSON.stringify(err)}`, 500)
    }
} 