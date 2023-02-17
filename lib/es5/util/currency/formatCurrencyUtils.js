"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intlFormatCurrency = void 0;
const formatNumberUtils_1 = require("../number/formatNumberUtils");
/**
 * Format a number (currency value) and return a string based on passed number
 * @param {bigint | number} value
 * @param {string} currency currency code
 * @param {IntlFormatCurrencyOptions} options options. Default value is { maximumFractionDigits: 0, minimumFractionDigits: 0, thousandSeparator: "" }
 * @returns {string} formatted number
 */
const intlFormatCurrency = (value, currency, options) => {
    const { maximumFractionDigits = 0, minimumFractionDigits = 0, thousandSeparator = "", decimalSeparator = formatNumberUtils_1.DEFAULT_DECIMAL_SEPARATOR, locale = formatNumberUtils_1.DEFAULT_LOCALE } = options || {};
    const numberFormatOptions = {
        maximumFractionDigits: maximumFractionDigits,
        minimumFractionDigits: minimumFractionDigits,
        style: "currency",
        currency: currency,
    };
    const parts = Intl.NumberFormat(locale, numberFormatOptions).formatToParts(value);
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part.type === "group") {
            parts[i].value = thousandSeparator;
        }
        else if (part.type === "decimal") {
            parts[i].value = decimalSeparator;
        }
    }
    return parts.map(v => v.value).join("");
};
exports.intlFormatCurrency = intlFormatCurrency;
//# sourceMappingURL=formatCurrencyUtils.js.map