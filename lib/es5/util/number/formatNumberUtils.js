"use strict";
////////////////////////////////////////////////
// getDecimalSeparator
////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNumericValueShort = exports.getNumericValueShort = exports.getMetricPrefix = exports.SI_PREFIX_YOTTA = exports.SI_PREFIX_ZETTA = exports.SI_PREFIX_EXA = exports.SI_PREFIX_PETA = exports.SI_PREFIX_TERA = exports.SI_PREFIX_GIGA = exports.SI_PREFIX_MEGA = exports.SI_PREFIX_KILO = exports.roundNumber = exports.formatPositiveNumericValue = exports.formatNumericValue = exports.intlFormatNumber = exports.getDecimalLength = exports.DECIMAL_SEPARATOR = exports.getDecimalSeparator = exports.DEFAULT_DECIMAL_SEPARATOR = exports.DEFAULT_LOCALE = void 0;
exports.DEFAULT_LOCALE = 'en-US';
exports.DEFAULT_DECIMAL_SEPARATOR = '.';
const getDecimalSeparator = (locale = exports.DEFAULT_LOCALE, fallback = exports.DEFAULT_DECIMAL_SEPARATOR) => {
    var _a;
    const numberWithDecimalSeparator = 1.1;
    return ((_a = Intl.NumberFormat(locale).formatToParts(numberWithDecimalSeparator).find(part => part.type === 'decimal')) === null || _a === void 0 ? void 0 : _a.value) || fallback;
};
exports.getDecimalSeparator = getDecimalSeparator;
exports.DECIMAL_SEPARATOR = (0, exports.getDecimalSeparator)();
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
const getDecimalLength = (value) => {
    const parts = value.toString().split(exports.DECIMAL_SEPARATOR);
    return parts.length === 2 ? parts[1].length : 0;
};
exports.getDecimalLength = getDecimalLength;
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
const intlFormatNumber = (value, options) => {
    const { maximumFractionDigits = 0, minimumFractionDigits = 0, thousandSeparator = "" } = options || {};
    const parts = Intl.NumberFormat(exports.DEFAULT_LOCALE, { maximumFractionDigits: maximumFractionDigits, minimumFractionDigits: minimumFractionDigits }).formatToParts(value);
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part.type === "group") {
            parts[i].value = thousandSeparator;
        }
        else if (part.type === "decimal") {
            parts[i].value = ".";
        }
    }
    return parts.map(v => v.value).join("");
};
exports.intlFormatNumber = intlFormatNumber;
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
const formatNumericValue = (value, maximumFractionDigits = 0, minimumFractionDigits = 0) => {
    return (0, exports.intlFormatNumber)(value, { maximumFractionDigits: maximumFractionDigits, minimumFractionDigits: minimumFractionDigits, thousandSeparator: " " });
};
exports.formatNumericValue = formatNumericValue;
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
const formatPositiveNumericValue = (value, decimals = 0, fallback = "n/a") => {
    if (value != undefined && value > 0) {
        return (0, exports.formatNumericValue)(value, decimals);
    }
    return fallback;
};
exports.formatPositiveNumericValue = formatPositiveNumericValue;
/**
 * Round a number to a given number of decimal places
 * @param {number} value value to round
 * @param {number} decimals number of decimal places
 * @return Rounded number
 * @example round(1.123456789, 0) => 1
 * @example round(1.123456789, 2) => 1.12
 */
const roundNumber = (value, decimals) => {
    return Number((0, exports.intlFormatNumber)(value, { maximumFractionDigits: decimals, thousandSeparator: "" }));
};
exports.roundNumber = roundNumber;
exports.SI_PREFIX_KILO = "K";
exports.SI_PREFIX_MEGA = "M";
exports.SI_PREFIX_GIGA = "G";
exports.SI_PREFIX_TERA = "T";
exports.SI_PREFIX_PETA = "P";
exports.SI_PREFIX_EXA = "E";
exports.SI_PREFIX_ZETTA = "Z";
exports.SI_PREFIX_YOTTA = "Y";
/**
 * Get metric prefix (SI symbol) of a number.
 * Supported numbers are from 1e3 to 1e24
 * @param {bigint | number} value value to format
 * @return Metric prefix (SI symbol) of a number.
 * @see https://en.wikipedia.org/wiki/Metric_prefix
 * @see https://www.nist.gov/pml/owm/metric-si-prefixes
 */
const getMetricPrefix = (value) => {
    if (value < 1e3) {
        return "";
    }
    if (value < 1e6) {
        return exports.SI_PREFIX_KILO;
    }
    if (value < 1e9) {
        return exports.SI_PREFIX_MEGA;
    }
    if (value < 1e12) {
        return exports.SI_PREFIX_GIGA;
    }
    if (value < 1e15) {
        return exports.SI_PREFIX_TERA;
    }
    if (value < 1e18) {
        return exports.SI_PREFIX_PETA;
    }
    if (value < 1e21) {
        return exports.SI_PREFIX_EXA;
    }
    if (value < 1e24) {
        return exports.SI_PREFIX_ZETTA;
    }
    return exports.SI_PREFIX_YOTTA;
};
exports.getMetricPrefix = getMetricPrefix;
const numericValueShortRanges = [
    { divider: 1e24, prefix: exports.SI_PREFIX_YOTTA },
    { divider: 1e21, prefix: exports.SI_PREFIX_ZETTA },
    { divider: 1e18, prefix: exports.SI_PREFIX_EXA },
    { divider: 1e15, prefix: exports.SI_PREFIX_PETA },
    { divider: 1e12, prefix: exports.SI_PREFIX_TERA },
    { divider: 1e9, prefix: exports.SI_PREFIX_GIGA },
    { divider: 1e6, prefix: exports.SI_PREFIX_MEGA },
    { divider: 1e3, prefix: exports.SI_PREFIX_KILO },
];
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
const getNumericValueShort = (value, options) => {
    const { maximumFractionDigits = 10, prefixOverride = {} } = options || {};
    function formatNumber(n) {
        const multiplier = n < 0 ? -1 : 1;
        for (let i = 0; i < numericValueShortRanges.length; i++) {
            const range = numericValueShortRanges[i];
            if (n * multiplier >= range.divider) {
                const prefix = prefixOverride[range.divider] || range.prefix;
                return {
                    value: n,
                    shortValue: (0, exports.roundNumber)(n / range.divider, maximumFractionDigits),
                    divider: range.divider,
                    prefix: prefix
                };
            }
        }
        return {
            value: n,
            shortValue: n,
            divider: 1,
            prefix: ""
        };
    }
    return formatNumber(value);
};
exports.getNumericValueShort = getNumericValueShort;
/**
 * Format a number and return a shorted version of it.
 * Functions `intlFormatNumber` and `getNumericValueShort` are used to format the number.
 * @param {bigint | number} value value to format.
 * @param {FormatNumericValueShortOptions} options options to format the number. Default value is {maximumFractionDigits: 3, unitSeparator: " "}. Prefix can be overridden by passing prefixOverride.
 * @return Formatted number.
 */
const formatNumericValueShort = (value, options) => {
    const { maximumFractionDigits = 3, prefixOverride = {}, unitSeparator = " " } = options || {};
    const shortValue = (0, exports.getNumericValueShort)(Number(value), {
        maximumFractionDigits: maximumFractionDigits,
        prefixOverride: prefixOverride
    });
    const shortValueFormatted = (0, exports.intlFormatNumber)(shortValue.shortValue, {
        maximumFractionDigits: maximumFractionDigits,
    });
    if (shortValue.prefix.length === 0) {
        return shortValueFormatted;
    }
    return `${shortValueFormatted}${unitSeparator}${shortValue.prefix}`;
};
exports.formatNumericValueShort = formatNumericValueShort;
//# sourceMappingURL=formatNumberUtils.js.map