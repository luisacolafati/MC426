import { CustomError } from "./CustomError"

export class MissingParamError extends CustomError {
    constructor (paramName: string, dataTypeExpected: string) {
        super(`Missing param ${paramName}, it should be ${dataTypeExpected}. Please, revise your .csv file`, 400)
    }
} 