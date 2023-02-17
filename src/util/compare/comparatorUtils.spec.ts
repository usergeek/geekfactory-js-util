import {antdTableSorterWithNumberInTheBeginning, booleanComparator, numberComparatorWithNumberInTheBeginning} from "./comparatorUtils"

describe("ComparatorUtils", () => {
    describe("antdTableSorterWithNumberInTheBeginning", () => {
        const asc = (a, b) => antdTableSorterWithNumberInTheBeginning(a, b, "ascend")
        const desc = (a, b) => antdTableSorterWithNumberInTheBeginning(a, b, "descend")

        it("with NaN, Infinities, null, undefined", () => {
            const expected = [NaN, 3, -1, undefined, undefined, Number.POSITIVE_INFINITY, 1, -5, 4, 2, undefined, null, Number.NEGATIVE_INFINITY]
            expect(expected.sort(asc)).toStrictEqual([-5, -1, 1, 2, 3, 4, NaN, Number.POSITIVE_INFINITY, null, Number.NEGATIVE_INFINITY, undefined, undefined, undefined])
            expect(expected.sort(desc)).toStrictEqual([Number.NEGATIVE_INFINITY, null, Number.POSITIVE_INFINITY, NaN, -5, -1, 1, 2, 3, 4, undefined, undefined, undefined])
        })

        it("other", () => {
            const expected = [undefined, 3, undefined, undefined, -5, 1, 4, 2, undefined, -1]
            expect(expected.sort(asc)).toStrictEqual([-5, -1, 1, 2, 3, 4, undefined, undefined, undefined, undefined])
            expect(expected.sort(desc)).toStrictEqual([-5, -1, 1, 2, 3, 4, undefined, undefined, undefined, undefined])
        })
    })

    describe("numberComparatorWithNumberInTheBeginning", () => {
        const asc = (a, b) => numberComparatorWithNumberInTheBeginning(a, b, "ascend")
        const desc = (a, b) => numberComparatorWithNumberInTheBeginning(a, b, "descend")

        it("with NaN, Infinities, null, undefined", () => {
            const expected = [NaN, 3, -1, undefined, undefined, Number.POSITIVE_INFINITY, 1, 4, -5, 2, undefined, null, Number.NEGATIVE_INFINITY]
            expect(expected.sort(asc)).toStrictEqual([-5, -1, 1, 2, 3, 4, NaN, Number.POSITIVE_INFINITY, null, Number.NEGATIVE_INFINITY, undefined, undefined, undefined])
            expect(expected.sort(desc)).toStrictEqual([4, 3, 2, 1, -1, -5, NaN, Number.POSITIVE_INFINITY, null, Number.NEGATIVE_INFINITY, undefined, undefined, undefined])
        })

        it("other", () => {
            const expected = [undefined, 3, undefined, undefined, -5, 1, 4, 2, undefined, -1]
            expect(expected.sort(asc)).toStrictEqual([-5, -1, 1, 2, 3, 4, undefined, undefined, undefined, undefined])
            expect(expected.sort(desc)).toStrictEqual([4, 3, 2, 1, -1, -5, undefined, undefined, undefined, undefined])
        })
    })

    it("booleanComparator", () => {
        const fn = (a: boolean, b: boolean) => booleanComparator(a, b)
        expect(fn(true, true)).toBe(0)
        expect(fn(true, false)).toBe(1)
        expect(fn(false, true)).toBe(-1)
        expect(fn(false, false)).toBe(0)
    })
})