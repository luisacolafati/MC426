export abstract class CustomError extends Error {
    private readonly httpStatusCode: number
    
    constructor (message: string, httpStatusCode: number) {
        super(message)
        this.httpStatusCode = httpStatusCode
    }
}
