"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GFError = void 0;
/**
 * GFError is a wrapper for errors that occur.
 * Supports wrapping native errors and strings.
 */
class GFError {
    constructor(message, rawError) {
        this.toString = () => {
            return `GFError (message: ${this.message}, rawError: ${this.rawError})`;
        };
        this.message = message;
        this.rawError = rawError;
    }
    static withUnknownError(e) {
        return e instanceof GFError ? e : GFError.withNativeError(e);
    }
    static withNativeError(error) {
        if (typeof error === "string") {
            return new GFError(error, error);
        }
        if (error.hasOwnProperty("message")) {
            return new GFError(error.message, error);
        }
        return new GFError(`${error}`, error);
    }
    toNativeError() {
        return new Error(this.message);
    }
}
exports.GFError = GFError;
//# sourceMappingURL=gfError.js.map