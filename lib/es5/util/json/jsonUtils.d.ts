/**
 * Stringify a JSON object with BigInt support
 * @param value Value to stringify
 * @param space Space to use for indentation
 */
export declare const jsonStringifyWithBigInt: (value: any, space?: string | number) => string;
/**
 * Parse a JSON string with BigInt support
 * @param value Value to parse
 * @return Parsed value
 */
export declare const jsonParseWithBigInt: (value: string) => any;
