import {intlFormatNumber, IntlFormatNumberOptions} from "../number/formatNumberUtils"

////////////////////////////////////////////////
// formatMemoryShort
////////////////////////////////////////////////

export type FormatMemoryShortOptions = {
    bytesUnit?: string
    kilobytesUnit?: string
    megabytesUnit?: string
    gigabytesUnit?: string
    terabytesUnit?: string
    unitSeparator?: string
}
/**
 * Format memory in bytes and return a string based on passed number
 * Bytes are formatted as "B", kilobytes as "KiB", megabytes as "MiB", gigabytes as "GiB", terabytes as "TiB"
 * @param {number | bigint} value number of bytes to format
 * @param {number | undefined} decimals maximum number of fraction digits. Defaults to 0.
 * @param {FormatMemoryShortOptions | undefined} options options for formatting. Defaults to {bytesUnit: "B", kilobytesUnit: "KiB", megabytesUnit: "MiB", gigabytesUnit: "GiB", terabytesUnit: "TiB", unitSeparator: " "}.
 * @return Formatted number
 * @see https://en.wikipedia.org/wiki/Binary_prefix
 * @example formatMemoryShort(1) => "1 B"
 * @example formatMemoryShort(1024) => "1 KiB"
 * @example formatMemoryShort(1024, 2) => "1.00 KiB"
 * @example formatMemoryShort(1024, 2, {kilobytesUnit: "kilobytes"unitSeparator: ""}) => "1.00kilobytes"
 * @example formatMemoryShort(1024 ** 2) => "1 MiB"
 * @example formatMemoryShort(1024 ** 3) => "1 GiB"
 * @example formatMemoryShort(1024 ** 4) => "1 TiB"
 */
export const formatMemoryShort = (value: number | bigint, decimals?: number, options?: FormatMemoryShortOptions): string => {
    decimals = decimals == undefined ? 0 : decimals
    const {bytesUnit = "B", kilobytesUnit = "KiB", megabytesUnit = "MiB", gigabytesUnit = "GiB", terabytesUnit = "TiB", unitSeparator = " "} = options || {}

    const valueAsNumber = Number(value)
    const absValue = Math.abs(valueAsNumber)
    const intlFormatNumberOptions: IntlFormatNumberOptions = {maximumFractionDigits: decimals, thousandSeparator: ""}
    if (absValue >= 1024 ** 4) {
        return `${intlFormatNumber(valueAsNumber / Math.pow(1024, 4), intlFormatNumberOptions)}${unitSeparator}${terabytesUnit}`
    }
    if (absValue >= 1024 ** 3) {
        return `${intlFormatNumber(valueAsNumber / Math.pow(1024, 3), intlFormatNumberOptions)}${unitSeparator}${gigabytesUnit}`
    }
    if (absValue >= 1024 ** 2) {
        return `${intlFormatNumber(valueAsNumber / Math.pow(1024, 2), intlFormatNumberOptions)}${unitSeparator}${megabytesUnit}`
    }
    if (absValue >= 1024) {
        return `${intlFormatNumber(valueAsNumber / 1024, intlFormatNumberOptions)}${unitSeparator}${kilobytesUnit}`
    }
    return `${intlFormatNumber(value, intlFormatNumberOptions)}${unitSeparator}${bytesUnit}`
}