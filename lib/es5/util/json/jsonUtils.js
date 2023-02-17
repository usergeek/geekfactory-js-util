"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParseWithBigInt = exports.jsonStringifyWithBigInt = void 0;
/**
 * Stringify a JSON object with BigInt support
 * @param value Value to stringify
 * @param space Space to use for indentation
 */
const jsonStringifyWithBigInt = (value, space) => {
    return JSON.stringify(value, (key, value) => {
        if (typeof value === "bigint") {
            return `${value.toString()}n`;
        }
        return value;
    }, space);
};
exports.jsonStringifyWithBigInt = jsonStringifyWithBigInt;
/**
 * Parse a JSON string with BigInt support
 * @param value Value to parse
 * @return Parsed value
 */
const jsonParseWithBigInt = (value) => {
    return JSON.parse(value, (key, value) => {
        if (typeof value === "string" && /^\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1));
        }
        return value;
    });
};
exports.jsonParseWithBigInt = jsonParseWithBigInt;
//# sourceMappingURL=jsonUtils.js.map