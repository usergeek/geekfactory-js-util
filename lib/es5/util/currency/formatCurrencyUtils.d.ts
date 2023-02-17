export type IntlFormatCurrencyOptions = {
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    thousandSeparator?: string;
    decimalSeparator?: string;
    locale?: string;
};
/**
 * Format a number (currency value) and return a string based on passed number
 * @param {bigint | number} value
 * @param {string} currency currency code
 * @param {IntlFormatCurrencyOptions} options options. Default value is { maximumFractionDigits: 0, minimumFractionDigits: 0, thousandSeparator: "" }
 * @returns {string} formatted number
 */
export declare const intlFormatCurrency: (value: bigint | number, currency: string, options?: IntlFormatCurrencyOptions) => string;
