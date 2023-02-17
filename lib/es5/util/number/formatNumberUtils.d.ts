export declare const DEFAULT_LOCALE = "en-US";
export declare const DEFAULT_DECIMAL_SEPARATOR = ".";
export declare const getDecimalSeparator: (locale?: string, fallback?: string) => string;
export declare const DECIMAL_SEPARATOR: string;
/**
 * Get decimal length of a number
 * @param value number
 * @returns decimal length
 * @example getDecimalLength(1) => 0
 * @example getDecimalLength(1.1) => 1
 * @example getDecimalLength(1.11) => 2
 * @example getDecimalLength(1.000) => 3
 */
export declare const getDecimalLength: (value: number) => number;
export type IntlFormatNumberOptions = {
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    thousandSeparator?: string;
};
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
export declare const intlFormatNumber: (value: bigint | number, options?: IntlFormatNumberOptions) => string;
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
export declare const formatNumericValue: (value: bigint | number, maximumFractionDigits?: number, minimumFractionDigits?: number) => string;
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
export declare const formatPositiveNumericValue: (value?: bigint | number, decimals?: number, fallback?: string) => string;
/**
 * Round a number to a given number of decimal places
 * @param {number} value value to round
 * @param {number} decimals number of decimal places
 * @return Rounded number
 * @example round(1.123456789, 0) => 1
 * @example round(1.123456789, 2) => 1.12
 */
export declare const roundNumber: (value: number, decimals: number) => number;
export declare const SI_PREFIX_KILO = "K";
export declare const SI_PREFIX_MEGA = "M";
export declare const SI_PREFIX_GIGA = "G";
export declare const SI_PREFIX_TERA = "T";
export declare const SI_PREFIX_PETA = "P";
export declare const SI_PREFIX_EXA = "E";
export declare const SI_PREFIX_ZETTA = "Z";
export declare const SI_PREFIX_YOTTA = "Y";
/**
 * Get metric prefix (SI symbol) of a number.
 * Supported numbers are from 1e3 to 1e24
 * @param {bigint | number} value value to format
 * @return Metric prefix (SI symbol) of a number.
 * @see https://en.wikipedia.org/wiki/Metric_prefix
 * @see https://www.nist.gov/pml/owm/metric-si-prefixes
 */
export declare const getMetricPrefix: (value: bigint | number) => string;
export type NumericValueShortRange = {
    divider: number;
    prefix: string;
};
export type NumericValueShort = {
    value: number;
    shortValue: number;
    divider: number;
    prefix: string;
};
export type GetNumericValueShortOptions = {
    maximumFractionDigits?: number;
    /**
     * override prefix for specific divider
     */
    prefixOverride?: Record<number, string>;
};
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
export declare const getNumericValueShort: (value: number, options?: GetNumericValueShortOptions) => NumericValueShort;
export type FormatNumericValueShortOptions = GetNumericValueShortOptions & {
    unitSeparator?: string;
};
/**
 * Format a number and return a shorted version of it.
 * Functions `intlFormatNumber` and `getNumericValueShort` are used to format the number.
 * @param {bigint | number} value value to format.
 * @param {FormatNumericValueShortOptions} options options to format the number. Default value is {maximumFractionDigits: 3, unitSeparator: " "}. Prefix can be overridden by passing prefixOverride.
 * @return Formatted number.
 */
export declare const formatNumericValueShort: (value: bigint | number, options?: FormatNumericValueShortOptions) => string;
