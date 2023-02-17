////////////////////////////////////////////////
// getDecimalSeparator
////////////////////////////////////////////////

export const DEFAULT_LOCALE = 'en-US'
export const DEFAULT_DECIMAL_SEPARATOR = '.'
export const getDecimalSeparator = (locale: string = DEFAULT_LOCALE, fallback: string = DEFAULT_DECIMAL_SEPARATOR): string => {
    const numberWithDecimalSeparator = 1.1;
    return Intl.NumberFormat(locale).formatToParts(numberWithDecimalSeparator).find(part => part.type === 'decimal')?.value || fallback;
}

export const DECIMAL_SEPARATOR = getDecimalSeparator()

////////////////////////////////////////////////
// getDecimalLength
////////////////////////////////////////////////

/**
 * Get decimal length of a number
 * @param value number
 * @returns decimal length
 * @example getDecimalLength(1) => 0
 * @example getDecimalLength(1.1) => 1
 * @example getDecimalLength(1.11) => 2
 * @example getDecimalLength(1.000) => 3
 */
export const getDecimalLength = (value: number): number => {
    const parts = value.toString().split(DECIMAL_SEPARATOR)
    return parts.length === 2 ? parts[1].length : 0
}

////////////////////////////////////////////////
// intlFormatNumber
////////////////////////////////////////////////

export type IntlFormatNumberOptions = {
    maximumFractionDigits?: number
    minimumFractionDigits?: number
    thousandSeparator?: string
}
/**
 * Format a number and return a string based on passed number
 * "Intl.NumberFormat" function is used to format the number with passed options.
 * @param {bigint | number} value number to format
 * @param {IntlFormatNumberOptions} options. Default value is { maximumFractionDigits: 0, minimumFractionDigits: 0, thousandSeparator: "" }
 * @returns {string} formatted number
 * @example intlFormatNumber(1234, { maximumFractionDigits: 2, minimumFractionDigits: 2, thousandSeparator: " " }) => "1 234.00"
 * @example intlFormatNumber(1234, { maximumFractionDigits: 2, minimumFractionDigits: 1, thousandSeparator: "," }) => "1,234.0"
 * @example intlFormatNumber(1.000001, { maximumFractionDigits: 5, minimumFractionDigits: 0, thousandSeparator: "" }) => "1"
 * @example intlFormatNumber(1.000001, { maximumFractionDigits: 5, minimumFractionDigits: 2, thousandSeparator: "" }) => "1.00"
 * @example intlFormatNumber(1.000001, { maximumFractionDigits: 6, minimumFractionDigits: 0, thousandSeparator: "" }) => "1.000001"
 */
export const intlFormatNumber = (value: bigint | number, options?: IntlFormatNumberOptions): string => {
    const {maximumFractionDigits = 0, minimumFractionDigits = 0, thousandSeparator = ""} = options || {}
    const parts = Intl.NumberFormat(DEFAULT_LOCALE, {maximumFractionDigits: maximumFractionDigits, minimumFractionDigits: minimumFractionDigits}).formatToParts(value)
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        if (part.type === "group") {
            parts[i].value = thousandSeparator
        } else if (part.type === "decimal") {
            parts[i].value = "."
        }
    }
    return parts.map(v => v.value).join("")
}

////////////////////////////////////////////////
// formatNumericValue
////////////////////////////////////////////////

/**
 * Format a number and return a string based on passed number
 * "intlFormatNumber" function is used to format the number with "thousandSeparator" option equal to " ")
 * @param {bigint | number} value
 * @param {number | 0} maximumFractionDigits maximum number of fraction digits
 * @param {number | 0} minimumFractionDigits minimum number of fraction digits
 * @return Formatted number
 * @example formatNumericValue(1.123456789, 0, 0) => "1"
 * @example formatNumericValue(1.123456789, 6, 0) => "1.123457"
 * @example formatNumericValue(1.00001, 4, 0) => "1"
 * @example formatNumericValue(1.00001, 5, 0) => "1.00001"
 * @example formatNumericValue(1000.00001, 5, 0) => "1 000.00001"
 */
export const formatNumericValue = (value: bigint | number, maximumFractionDigits: number = 0, minimumFractionDigits: number = 0): string => {
    return intlFormatNumber(value, {maximumFractionDigits: maximumFractionDigits, minimumFractionDigits: minimumFractionDigits, thousandSeparator: " "})
}

////////////////////////////////////////////////
// formatPositiveNumericValue
////////////////////////////////////////////////

/**
 * Format a positive number (that greater than zero) and return a string based on passed number
 * "formatNumericValue" function is used to format the number
 * @param {bigint | number} value value to format
 * @param {number | undefined} decimals maximum number of fraction digits
 * @param fallback fallback value if value is undefined or less than or equal to zero
 * @return Formatted number
 * @example formatPositiveNumericValue(1.123456789, 0) => "1"
 * @example formatPositiveNumericValue(1234.123456789, 2) => "1 234.12"
 * @example formatPositiveNumericValue(0.123456789, 2) => "n/a"
 * @example formatPositiveNumericValue(0.123456789, 2, "") => ""
 * @example formatPositiveNumericValue(BigInt(0), 2, "") => ""
 * @example formatPositiveNumericValue(BigInt(-10), 2, "") => ""
 */
export const formatPositiveNumericValue = (value?: bigint | number, decimals: number = 0, fallback: string = "n/a"): string => {
    if (value != undefined && value > 0) {
        return formatNumericValue(value, decimals)
    }
    return fallback
}

/**
 * Round a number to a given number of decimal places
 * @param {number} value value to round
 * @param {number} decimals number of decimal places
 * @return Rounded number
 * @example round(1.123456789, 0) => 1
 * @example round(1.123456789, 2) => 1.12
 */
export const roundNumber = (value: number, decimals: number): number => {
    return Number(intlFormatNumber(value, {maximumFractionDigits: decimals, thousandSeparator: ""}))
}

export const SI_PREFIX_KILO = "K"
export const SI_PREFIX_MEGA = "M";
export const SI_PREFIX_GIGA = "G";
export const SI_PREFIX_TERA = "T";
export const SI_PREFIX_PETA = "P";
export const SI_PREFIX_EXA = "E";
export const SI_PREFIX_ZETTA = "Z";
export const SI_PREFIX_YOTTA = "Y";

/**
 * Get metric prefix (SI symbol) of a number.
 * Supported numbers are from 1e3 to 1e24
 * @param {bigint | number} value value to format
 * @return Metric prefix (SI symbol) of a number.
 * @see https://en.wikipedia.org/wiki/Metric_prefix
 * @see https://www.nist.gov/pml/owm/metric-si-prefixes
 */
export const getMetricPrefix = (value: bigint | number): string => {
    if (value < 1e3) {
        return ""
    }
    if (value < 1e6) {
        return SI_PREFIX_KILO
    }
    if (value < 1e9) {
        return SI_PREFIX_MEGA
    }
    if (value < 1e12) {
        return SI_PREFIX_GIGA
    }
    if (value < 1e15) {
        return SI_PREFIX_TERA
    }
    if (value < 1e18) {
        return SI_PREFIX_PETA
    }
    if (value < 1e21) {
        return SI_PREFIX_EXA
    }
    if (value < 1e24) {
        return SI_PREFIX_ZETTA
    }
    return SI_PREFIX_YOTTA
}

export type NumericValueShortRange = {
    divider: number,
    prefix: string
}
const numericValueShortRanges: Array<NumericValueShortRange> = [
    {divider: 1e24, prefix: SI_PREFIX_YOTTA},
    {divider: 1e21, prefix: SI_PREFIX_ZETTA},
    {divider: 1e18, prefix: SI_PREFIX_EXA},
    {divider: 1e15, prefix: SI_PREFIX_PETA},
    {divider: 1e12, prefix: SI_PREFIX_TERA},
    {divider: 1e9, prefix: SI_PREFIX_GIGA},
    {divider: 1e6, prefix: SI_PREFIX_MEGA},
    {divider: 1e3, prefix: SI_PREFIX_KILO},
]
export type NumericValueShort = {
    value: number
    shortValue: number
    divider: number
    prefix: string
}
export type GetNumericValueShortOptions = {
    maximumFractionDigits?: number
    /**
     * override prefix for specific divider
     */
    prefixOverride?: Record<number, string>
}
/**
 * Return a short version of a number.
 * Returned value has original value, short value, divider and prefix.
 * @param value value to get short version of.
 * @param options options to get short version of a number. Default value is {maximumFractionDigits: 10}. Prefix can be overridden by passing prefixOverride.
 * @return short version of a number.
 * @example getNumericValueShort(123) => {value: 123, shortValue: 123, divider: 1, prefix: ""}
 * @example getNumericValueShort(1234.56789) => {value: 1234.56789, shortValue: 1.23456789, divider: 1000, prefix: "K"}
 * @example getNumericValueShort(123456789) => {value: 123456789, shortValue: 123.456789, divider: 1000000, prefix: "M"}
 */
export const getNumericValueShort = (value: number, options?: GetNumericValueShortOptions): NumericValueShort => {
    const {maximumFractionDigits = 10, prefixOverride = {}} = options || {}

    function formatNumber(n: number): NumericValueShort {
        const multiplier = n < 0 ? -1 : 1
        for (let i = 0; i < numericValueShortRanges.length; i++) {
            const range: NumericValueShortRange = numericValueShortRanges[i];
            if (n * multiplier >= range.divider) {
                const prefix = prefixOverride[range.divider] || range.prefix

                return {
                    value: n,
                    shortValue: roundNumber(n / range.divider, maximumFractionDigits),
                    divider: range.divider,
                    prefix: prefix
                }
            }
        }
        return {
            value: n,
            shortValue: n,
            divider: 1,
            prefix: ""
        }
    }

    return formatNumber(value);
}

export type FormatNumericValueShortOptions = GetNumericValueShortOptions & {
    unitSeparator?: string
}
/**
 * Format a number and return a shorted version of it.
 * Functions `intlFormatNumber` and `getNumericValueShort` are used to format the number.
 * @param {bigint | number} value value to format.
 * @param {FormatNumericValueShortOptions} options options to format the number. Default value is {maximumFractionDigits: 3, unitSeparator: " "}. Prefix can be overridden by passing prefixOverride.
 * @return Formatted number.
 */
export const formatNumericValueShort = (value: bigint | number, options?: FormatNumericValueShortOptions): string => {
    const {maximumFractionDigits = 3, prefixOverride = {}, unitSeparator = " "} = options || {}
    const shortValue: NumericValueShort = getNumericValueShort(Number(value), {
        maximumFractionDigits: maximumFractionDigits,
        prefixOverride: prefixOverride
    })
    const shortValueFormatted = intlFormatNumber(shortValue.shortValue, {
        maximumFractionDigits: maximumFractionDigits,
    });
    if (shortValue.prefix.length === 0) {
        return shortValueFormatted
    }
    return `${shortValueFormatted}${unitSeparator}${shortValue.prefix}`
}