import {formatNumericValue, formatNumericValueShort, formatPositiveNumericValue, getDecimalLength, getDecimalSeparator, getMetricPrefix, getNumericValueShort, GetNumericValueShortOptions, intlFormatNumber, NumericValueShort, roundNumber} from "./formatNumberUtils"

describe("FormatUtils", () => {

    it("getDecimalSeparator", () => {
        expect(getDecimalSeparator()).toEqual(".")
    })

    it("getDecimalLength", () => {
        expect(getDecimalLength(1.1)).toEqual(1)
        expect(getDecimalLength(1.123)).toEqual(3)
        expect(getDecimalLength(1.0)).toEqual(0)
        expect(getDecimalLength(-1.1)).toEqual(1)
        expect(getDecimalLength(-1.12345)).toEqual(5)
    })

    it("intlFormatNumber", () => {
        expect(intlFormatNumber(1234, {maximumFractionDigits: 2, minimumFractionDigits: 2, thousandSeparator: " "})).toEqual("1 234.00")
        expect(intlFormatNumber(1234, {maximumFractionDigits: 2, minimumFractionDigits: 1, thousandSeparator: ","})).toEqual("1,234.0")
        expect(intlFormatNumber(1.000001, {maximumFractionDigits: 5, minimumFractionDigits: 0, thousandSeparator: ""})).toEqual("1")
        expect(intlFormatNumber(1.000001, {maximumFractionDigits: 5, minimumFractionDigits: 2, thousandSeparator: ""})).toEqual("1.00")
        expect(intlFormatNumber(1.000001, {maximumFractionDigits: 6, minimumFractionDigits: 0, thousandSeparator: ""})).toEqual("1.000001")

        expect(intlFormatNumber(1.123456789)).toEqual("1")
        expect(intlFormatNumber(1.123456789, {})).toEqual("1")

        const value2 = 1.000001
        expect(intlFormatNumber(value2, {maximumFractionDigits: 0, minimumFractionDigits: 0})).toEqual("1")
        expect(intlFormatNumber(value2, {maximumFractionDigits: 1, minimumFractionDigits: 0})).toEqual("1")
        expect(intlFormatNumber(value2, {maximumFractionDigits: 5, minimumFractionDigits: 0})).toEqual("1")
        expect(intlFormatNumber(value2, {maximumFractionDigits: 5, minimumFractionDigits: 2})).toEqual("1.00")
        expect(intlFormatNumber(value2, {maximumFractionDigits: 6, minimumFractionDigits: 0})).toEqual("1.000001")
    })

    it("formatNumericValue", () => {
        expect(formatNumericValue(1.123456789, 0, 0)).toEqual("1")
        expect(formatNumericValue(1.123456789, 6, 0)).toEqual("1.123457")
        expect(formatNumericValue(1.00001, 4, 0)).toEqual("1")
        expect(formatNumericValue(1234567.00001, 4, 0)).toEqual("1 234 567")
        expect(formatNumericValue(1.00001, 5, 0)).toEqual("1.00001")
        expect(formatNumericValue(1000.00001, 5, 0)).toEqual("1 000.00001")
        expect(formatNumericValue(BigInt(1000), 5, 0)).toEqual("1 000")
        expect(formatNumericValue(BigInt(-1000), 5, 0)).toEqual("-1 000")
    })

    it("formatPositiveNumericValue", () => {
        expect(formatPositiveNumericValue(1.123456789, 0)).toEqual("1")
        expect(formatPositiveNumericValue(1234.123456789, 2)).toEqual("1 234.12")
        expect(formatPositiveNumericValue(-0.123456789, 2)).toEqual("n/a")
        expect(formatPositiveNumericValue(-0.123456789, 2, "")).toEqual("")
        expect(formatPositiveNumericValue(BigInt(0), 2, "")).toEqual("")
        expect(formatPositiveNumericValue(BigInt(-10), 2, "")).toEqual("")
    })

    it("roundNumber", () => {
        expect(roundNumber(1.123456789, 0)).toEqual(1)
        expect(roundNumber(1.123456789, 1)).toEqual(1.1)
        expect(roundNumber(1.123456789, 2)).toEqual(1.12)
        expect(roundNumber(1.123456789, 3)).toEqual(1.123)
        expect(roundNumber(1.123456789, 5)).toEqual(1.12346)
        expect(roundNumber(1.4985, 3)).toEqual(1.499)
        expect(roundNumber(1234.56789 / 1_000, 20)).toEqual(1.2345678900000001)
        expect(roundNumber(1234.56789 / 1_000, 10)).toEqual(1.23456789)
    })

    it("getMetricPrefix", () => {
        expect(getMetricPrefix(0)).toEqual("")
        expect(getMetricPrefix(1)).toEqual("")
        expect(getMetricPrefix(1e3)).toEqual("K")
        expect(getMetricPrefix(1e6 - 1)).toEqual("K")
        expect(getMetricPrefix(1e6)).toEqual("M")
        expect(getMetricPrefix(1e9)).toEqual("G")
        expect(getMetricPrefix(1e12)).toEqual("T")
        expect(getMetricPrefix(1e15)).toEqual("P")
        expect(getMetricPrefix(1e18)).toEqual("E")
        expect(getMetricPrefix(1e21)).toEqual("Z")
        expect(getMetricPrefix(1e24)).toEqual("Y")
    })

    it("getNumericValueShort", () => {
        const fn = (value: number, options?: GetNumericValueShortOptions): NumericValueShort => getNumericValueShort(value, options)
        expect(fn(0)).toStrictEqual({value: 0, shortValue: 0, divider: 1, prefix: ""})
        expect(fn(1)).toStrictEqual({value: 1, shortValue: 1, divider: 1, prefix: ""})
        expect(fn(123)).toStrictEqual({value: 123, shortValue: 123, divider: 1, prefix: ""})
        expect(fn(1e3)).toStrictEqual({value: 1e3, shortValue: 1, divider: 1e3, prefix: "K"})
        expect(fn(1234.56789)).toStrictEqual({value: 1234.56789, shortValue: 1.23456789, divider: 1e3, prefix: "K"})
        expect(fn(1234.56789, {maximumFractionDigits: 4})).toStrictEqual({value: 1234.56789, shortValue: 1.2346, divider: 1e3, prefix: "K"})
        expect(fn(1234.55, {maximumFractionDigits: 4})).toStrictEqual({value: 1234.55, shortValue: 1.2346, divider: 1e3, prefix: "K"})
        expect(fn(1e6)).toStrictEqual({value: 1e6, shortValue: 1, divider: 1e6, prefix: "M"})
        expect(fn(123456789)).toStrictEqual({value: 123456789, shortValue: 123.456789, divider: 1e6, prefix: "M"})
        expect(fn(1e9)).toStrictEqual({value: 1e9, shortValue: 1, divider: 1e9, prefix: "G"})
        expect(fn(123456789000)).toStrictEqual({value: 123456789000, shortValue: 123.456789, divider: 1e9, prefix: "G"})
        expect(fn(1e12)).toStrictEqual({value: 1e12, shortValue: 1, divider: 1e12, prefix: "T"})
        expect(fn(1498500000000, {maximumFractionDigits: 3})).toStrictEqual({value: 1498500000000, shortValue: 1.499, divider: 1e12, prefix: "T"})
        expect(fn(123456789000000)).toStrictEqual({value: 123456789000000, shortValue: 123.456789, divider: 1e12, prefix: "T"})
        expect(fn(123456789000000000)).toStrictEqual({value: 123456789000000000, shortValue: 123.456789, divider: 1e15, prefix: "P"})
        expect(fn(123456789000000000000)).toStrictEqual({value: 123456789000000000000, shortValue: 123.456789, divider: 1e18, prefix: "E"})
        expect(fn(123456789000000000000000)).toStrictEqual({value: 123456789000000000000000, shortValue: 123.456789, divider: 1e21, prefix: "Z"})
        expect(fn(123456789000000000000000000)).toStrictEqual({value: 123456789000000000000000000, shortValue: 123.456789, divider: 1e24, prefix: "Y"})
        expect(fn(123456789000000000000000000000)).toStrictEqual({value: 123456789000000000000000000000, shortValue: 123456.789, divider: 1e24, prefix: "Y"})
    })

    it("formatNumericValueShort", () => {
        expect(formatNumericValueShort(0)).toEqual("0")
        expect(formatNumericValueShort(1)).toEqual("1")
        expect(formatNumericValueShort(123)).toEqual("123")
        expect(formatNumericValueShort(1234.56789)).toEqual("1.235 K")

        expect(formatNumericValueShort(1)).toEqual("1")
        expect(formatNumericValueShort(1e3)).toEqual("1 K")
        expect(formatNumericValueShort(1.23e3, {maximumFractionDigits: 2})).toEqual("1.23 K")
        expect(formatNumericValueShort(1e6)).toEqual("1 M")
        expect(formatNumericValueShort(1.23e6, {maximumFractionDigits: 2})).toEqual("1.23 M")
        expect(formatNumericValueShort(1e9)).toEqual("1 G")
        expect(formatNumericValueShort(1e9, {prefixOverride: {1e9: "B"}})).toEqual("1 B")
        expect(formatNumericValueShort(1.23e9, {maximumFractionDigits: 2})).toEqual("1.23 G")
        expect(formatNumericValueShort(1e12)).toEqual("1 T")
        expect(formatNumericValueShort(1e12, {unitSeparator: ""})).toEqual("1T")
        expect(formatNumericValueShort(1.23456e12)).toEqual("1.235 T")
        expect(formatNumericValueShort(1.23456e12, {maximumFractionDigits: 2})).toEqual("1.23 T")
    })
})
