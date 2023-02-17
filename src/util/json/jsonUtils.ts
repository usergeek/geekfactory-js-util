/**
 * Stringify a JSON object with BigInt support
 * @param value Value to stringify
 * @param space Space to use for indentation
 */
export const jsonStringifyWithBigInt = (value: any, space?: string | number) => {
    return JSON.stringify(value, (key, value) => {
        if (typeof value === "bigint") {
            return `${value.toString()}n`
        }
        return value
    }, space)
}

/**
 * Parse a JSON string with BigInt support
 * @param value Value to parse
 * @return Parsed value
 */
export const jsonParseWithBigInt = (value: string) => {
    return JSON.parse(value, (key, value) => {
        if (typeof value === "string" && /^\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1))
        }
        return value
    })
}