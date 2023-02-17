import {calculateValueDifferences, calculateValueDifferencesWithVariableIntervals, CalculateValueDifferencesWithVariableIntervalsOptions, findDifferenceBetweenLastAndFirstPositiveValue, removeValueIncreases, sumArrayOfBigInts, sumArrayOfNumbers} from "./calculationNumberUtils"

describe("CalculationUtils", () => {
    it("sumArrayOfNumbers", () => {
        expect(sumArrayOfNumbers([1, 2, 3])).toEqual(6)
        expect(sumArrayOfNumbers([1, 2, 3, 4, 5])).toEqual(15)
        expect(sumArrayOfNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(55)
        expect(sumArrayOfNumbers([])).toEqual(0)
        expect(sumArrayOfNumbers(undefined)).toEqual(0)
    })

    it("sumArrayOfBigInts", () => {
        expect(sumArrayOfBigInts([BigInt(1), BigInt(2), BigInt(3)])).toEqual(BigInt(6))
        expect(sumArrayOfBigInts([BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5)])).toEqual(BigInt(15))
        expect(sumArrayOfBigInts([BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5), BigInt(6), BigInt(7), BigInt(8), BigInt(9), BigInt(10)])).toEqual(BigInt(55))
        expect(sumArrayOfBigInts([])).toEqual(BigInt(0))
        expect(sumArrayOfBigInts(undefined)).toEqual(BigInt(0))
    })

    describe("removeIncreases", () => {
        it("removeValueIncreases", () => {
            expect(removeValueIncreases([])).toStrictEqual([])
            expect(removeValueIncreases([1])).toStrictEqual([1])
            expect(removeValueIncreases([null])).toStrictEqual([null])
            expect(removeValueIncreases([null, null, null])).toStrictEqual([null, null, null])
            expect(removeValueIncreases([30, 20])).toStrictEqual([30, 20])
            expect(removeValueIncreases([30, null, 20])).toStrictEqual([30, null, 20])
            expect(removeValueIncreases([30, 40])).toStrictEqual([30, 30])
            expect(removeValueIncreases([30, 40, 35])).toStrictEqual([30, 30, 25])
            expect(removeValueIncreases([30, 40, 45, 40])).toStrictEqual([30, 30, 30, 25])
            expect(removeValueIncreases([30, 40, 35, null, 34])).toStrictEqual([30, 30, 25, null, 24])
            expect(removeValueIncreases([30, null, 40, null, 35])).toStrictEqual([30, null, 30, null, 25])
            expect(removeValueIncreases([30, null, 40, null, 35, 50, 49])).toStrictEqual([30, null, 30, null, 25, 25, 24])
            expect(removeValueIncreases([3, null, 4, null, 3, 5, 4, 3, 2, 1, 5, 3])).toStrictEqual([3, null, 3, null, 2, 2, 1, 0, -1, -2, -2, -4])
        })
    })

    it("calculateValueDifferences", () => {
        expect(calculateValueDifferences([])).toStrictEqual([])
        expect(calculateValueDifferences([1])).toStrictEqual([])
        expect(calculateValueDifferences([3, 2, 1])).toStrictEqual([-1, -1])
        expect(calculateValueDifferences([4, 2, 1])).toStrictEqual([-2, -1])
        expect(calculateValueDifferences([4, 2, 2, 2, 1])).toStrictEqual([-2, 0, 0, -1])
        expect(calculateValueDifferences([null, null, null])).toStrictEqual([null, null])
        expect(calculateValueDifferences([null, null, null, null])).toStrictEqual([null, null, null])
        expect(calculateValueDifferences([2, null, 1, null])).toStrictEqual([null, -0.5, null])
        expect(calculateValueDifferences([2, null, 1, null], {absValues: true})).toStrictEqual([null, 0.5, null])
        expect(calculateValueDifferences([2, null, 1, null], {absValues: true, round: true})).toStrictEqual([null, 1, null])
        expect(calculateValueDifferences([null, 2, null, 1, null])).toStrictEqual([null, null, -0.5, null])
        expect(calculateValueDifferences([null, 2, null, 1, 1, null])).toStrictEqual([null, null, -0.5, 0, null])
        expect(calculateValueDifferences([4, null, 2, null, 1, 1, null])).toStrictEqual([null, -1, null, -0.5, 0, null])
    })

    it("calculateValueDifferencesWithVariableIntervals", () => {
        const dataIntervalLengthMapper = (dataIntervalLength: number) => dataIntervalLength;
        const fn = (dataPoints: Array<number | null>, dataIntervalLengths: Array<number | null>, options?: CalculateValueDifferencesWithVariableIntervalsOptions) => calculateValueDifferencesWithVariableIntervals(dataPoints, dataIntervalLengths, {...options, dataIntervalLengthMapper})
        expect(fn([], [])).toStrictEqual([])
        expect(fn([1], [1])).toStrictEqual([])
        expect(fn([3, 2, 1], [2, 2, 2])).toStrictEqual([-0.5, -0.5])
        expect(fn([2, null, 1, null], [2, 2, 4, 2])).toStrictEqual([null, -0.25, null])

    })

    it("findDifferenceBetweenLastAndFirstPositiveValue", () => {
        expect(findDifferenceBetweenLastAndFirstPositiveValue([])).toEqual(BigInt(0))
        expect(findDifferenceBetweenLastAndFirstPositiveValue([BigInt(1)])).toEqual(BigInt(0))
        expect(findDifferenceBetweenLastAndFirstPositiveValue([BigInt(1), BigInt(2)])).toEqual(BigInt(1))
        expect(findDifferenceBetweenLastAndFirstPositiveValue([BigInt(1), BigInt(2), BigInt(3), BigInt(0)])).toEqual(BigInt(2))
        expect(findDifferenceBetweenLastAndFirstPositiveValue([BigInt(-1), BigInt(5), BigInt(3), BigInt(0)])).toEqual(BigInt(-2))
    })
})