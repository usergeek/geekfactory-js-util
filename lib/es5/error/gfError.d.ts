/**
 * GFError is a wrapper for errors that occur.
 * Supports wrapping native errors and strings.
 */
export declare class GFError {
    message: string;
    rawError?: GFError | Error | string;
    constructor(message: string, rawError?: GFError | Error | string);
    static withUnknownError(e: GFError | Error | string): GFError;
    private static withNativeError;
    toNativeError(): Error;
    toString: () => string;
}
