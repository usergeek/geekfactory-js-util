import {DEFAULT_DECIMAL_SEPARATOR, DEFAULT_LOCALE} from "../number/formatNumberUtils";

export type IntlFormatCurrencyOptions = {
    maximumFractionDigits?: number
    minimumFractionDigits?: number
    thousandSeparator?: string
    decimalSeparator?: string
    locale?: string
}
/**
 * Format a number (currency value) and return a string based on passed number
 * @param {bigint | number} value
 * @param {string} currency currency code
 * @param {IntlFormatCurrencyOptions} options options. Default value is { maximumFractionDigits: 0, minimumFractionDigits: 0, thousandSeparator: "" }
 * @returns {string} formatted number
 */
export const intlFormatCurrency = (value: bigint | number, currency: string, options?: IntlFormatCurrencyOptions): string => {
    const {maximumFractionDigits = 0, minimumFractionDigits = 0, thousandSeparator = "", decimalSeparator = DEFAULT_DECIMAL_SEPARATOR, locale = DEFAULT_LOCALE} = options || {}
    const numberFormatOptions: Intl.NumberFormatOptions = {
        maximumFractionDigits: maximumFractionDigits,
        minimumFractionDigits: minimumFractionDigits,
        style: "currency",
        currency: currency,
    };
    const parts = Intl.NumberFormat(locale, numberFormatOptions).formatToParts(value)
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        if (part.type === "group") {
            parts[i].value = thousandSeparator
        } else if (part.type === "decimal") {
            parts[i].value = decimalSeparator
        }
    }
    return parts.map(v => v.value).join("")
}