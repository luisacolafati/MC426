import { CustomError } from "./CustomError"

export class InvalidParamError extends CustomError {
    constructor (paramName: string, dataTypeExpected: string) {
        super(`Invalid param received - ${paramName} should be ${dataTypeExpected}. Please, revise your .csv file`, 400)
    }
} 