export class UniqueContraintError extends Error {
    constructor (value : string) {
        super(`${value} must be unique`)
        
        Error.captureStackTrace(this, UniqueContraintError)
   }
}

export class InvalidPropertyError extends Error {
    constructor (msg:string) {
        super(msg)

        Error.captureStackTrace(this, InvalidPropertyError)
    }
}

export class RequiredParameterError extends Error {
    constructor (value:string) {
        super(`${value} cannot be null or undefined`)

        Error.captureStackTrace(this, RequiredParameterError)
    }
}

export class DocumentNotFoundError extends Error {
    constructor (value:string) {
        super(`The ${value} does not exist`)

        Error.captureStackTrace(this, DocumentNotFoundError)
    }
}

export class RequestParamNotProvidedError extends Error {
    constructor (value:string) {
        super(`${value} cannot be null`)

        Error.captureStackTrace(this, RequestParamNotProvidedError)
    }
}

export class RequestParamEmptyError extends Error {
    constructor (value:string) {
        super(`${value} cannot be empty`)

        Error.captureStackTrace(this, RequestParamEmptyError)
    }
}