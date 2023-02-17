import {intlFormatCurrency, IntlFormatCurrencyOptions} from "./formatCurrencyUtils";

describe("FormatCurrencyUtils", () => {
    describe("intlFormatCurrency $", () => {
        const currency = "USD"
        const fn = (value: bigint | number, options?: IntlFormatCurrencyOptions) => intlFormatCurrency(value, currency, options)
        it("intlFormatCurrency", () => {
            expect(fn(1234)).toEqual("$1234")
            expect(fn(1234, {thousandSeparator: " "})).toEqual("$1 234")

            expect(fn(1234.3456)).toEqual("$1234")
            expect(fn(1234.3456, {maximumFractionDigits: 1})).toEqual("$1234.3")
            expect(fn(1234.3456, {maximumFractionDigits: 3})).toEqual("$1234.346")
            expect(fn(1234.3456, {maximumFractionDigits: 3, decimalSeparator: ","})).toEqual("$1234,346")

            expect(fn(1.000001, { maximumFractionDigits: 5, minimumFractionDigits: 0 })).toEqual("$1")
            expect(fn(1.000001, { maximumFractionDigits: 5, minimumFractionDigits: 2 })).toEqual("$1.00")
            expect(fn(1.000001, { maximumFractionDigits: 6, minimumFractionDigits: 0 })).toEqual("$1.000001")
        })
    })

    describe("intlFormatCurrency ICP", () => {
        const currency = "ICP"
        const nbsp = " "
        const prefix = `${currency}${nbsp}`
        const fn = (value: bigint | number, options?: IntlFormatCurrencyOptions) => intlFormatCurrency(value, currency, options)
        it("intlFormatCurrency", () => {
            expect(fn(1234)).toEqual(`${prefix}1234`)
            expect(fn(1234, {thousandSeparator: " "})).toEqual(`${prefix}1 234`)

            expect(fn(1234.3456)).toEqual(`${prefix}1234`)
            expect(fn(1234.3456, {maximumFractionDigits: 1})).toEqual(`${prefix}1234.3`)
            expect(fn(1234.3456, {maximumFractionDigits: 3})).toEqual(`${prefix}1234.346`)
            expect(fn(1234.3456, {maximumFractionDigits: 3, decimalSeparator: ","})).toEqual(`${prefix}1234,346`)

            expect(fn(1.000001, { maximumFractionDigits: 5, minimumFractionDigits: 0 })).toEqual(`${prefix}1`)
            expect(fn(1.000001, { maximumFractionDigits: 5, minimumFractionDigits: 2 })).toEqual(`${prefix}1.00`)
            expect(fn(1.000001, { maximumFractionDigits: 6, minimumFractionDigits: 0 })).toEqual(`${prefix}1.000001`)
        })
    })
})