/**
 * GFError is a wrapper for errors that occur.
 * Supports wrapping native errors and strings.
 */
export class GFError {
    message: string
    rawError?: GFError | Error | string

    constructor(message: string, rawError?: GFError | Error | string) {
        this.message = message
        this.rawError = rawError
    }

    static withUnknownError(e: GFError | Error | string) {
        return e instanceof GFError ? e : GFError.withNativeError(e)
    }

    private static withNativeError(error: Error | string): GFError {
        if (typeof error === "string") {
            return new GFError(error, error)
        }
        if (error.hasOwnProperty("message")) {
            return new GFError(error.message, error)
        }
        return new GFError(`${error}`, error)
    }

    toNativeError(): Error {
        return new Error(this.message);
    }

    public toString = (): string => {
        return `GFError (message: ${this.message}, rawError: ${this.rawError})`;
    }
}