"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDifferenceBetweenLastAndFirstPositiveValue = exports.calculateValueDifferencesWithVariableIntervals = exports.calculateValueDifferences = exports.removeValueIncreases = exports.sumArrayOfBigInts = exports.sumArrayOfNumbers = void 0;
/**
 * Sums an array of numbers
 * @param array Array of numbers
 * @return {number} Sum of the array
 * @example sumArrayOfNumbers([1,2,3]) => 6
 * @example sumArrayOfNumbers(undefined) => 0
 */
const sumArrayOfNumbers = (array) => {
    return array ? array.reduce((a, b) => a + b, 0) : 0;
};
exports.sumArrayOfNumbers = sumArrayOfNumbers;
/**
 * Sums an array of BigInts
 * @param array Array of BigInts
 * @return {bigint} Sum of the array
 * @example sumArrayOfBigInts([BigInt(1),BigInt(2),BigInt(3)]) => BigInt(6)
 * @example sumArrayOfBigInts(undefined) => BigInt(0)
 */
const sumArrayOfBigInts = (array) => {
    return array ? array.reduce((a, b) => a + b, BigInt(0)) : BigInt(0);
};
exports.sumArrayOfBigInts = sumArrayOfBigInts;
/**
 * Removes increases within an array of numbers
 * @param {Array<number | null>} array Array of numbers
 * @return {Array<number | null>} Array of numbers without increases
 * @example removeIncreases([4,5,3,1,5,2]) => [4,4,3,1,1,2]
 * @example removeIncreases([30, 40, 35]) => [30, 30, 25]
 */
const removeValueIncreases = (array) => {
    const result = [];
    let previousSignificantValue = null;
    let lastValueIncrease = 0;
    for (let idx = 0; idx < array.length; idx++) {
        const value = array[idx];
        //1. process first element
        if (idx === 0) {
            result.push(value);
            if (value != undefined) {
                previousSignificantValue = value;
            }
            continue;
        }
        //2. try to detect the increase since last significant value
        if (value != undefined && previousSignificantValue != undefined) {
            if (value - lastValueIncrease > previousSignificantValue) {
                //value increase detected!
                lastValueIncrease = value - previousSignificantValue;
            }
        }
        //3. add value to the result
        if (value != undefined) {
            const newValue = value - lastValueIncrease;
            result.push(newValue);
            //4. update previous significant value
            previousSignificantValue = newValue;
        }
        else {
            result.push(null);
        }
    }
    return result;
};
exports.removeValueIncreases = removeValueIncreases;
/**
 * Maps an array of numbers to an array of differences between the numbers.
 * Each element can be number or null.
 * If previous element is null, the difference for current element equal to the last finite number divided by the number of nulls between them.
 * @param {Array<number | null>} dataPoints Array of numbers or nulls
 * @param {CalculateValueDifferencesOptions} options Options. Default: {absValues: false, round: false}
 * @return {Array<number | null>} Array of differences between the numbers. Size is one less than the input array.
 * @example calculateValueDifferences([3, 2, 1]) => [-1, -1]
 * @example calculateValueDifferences([4, 2, 2, 2, 1]) => [-2, 0, 0, -1]
 * @example calculateValueDifferences([2, null, 1, null]) => [null, -0.5, null]
 * @example calculateValueDifferences([2, null, 1, null], {absValues: true}) => [null, 0.5, null]
 * @example calculateValueDifferences([2, null, 1, null], {absValues: true, round: true}) => [null, 1, null]
 */
const calculateValueDifferences = (dataPoints, options) => {
    const { absValues = false, round = false } = options || {};
    const result = [];
    if (dataPoints.length > 1) {
        let previousSignificantValue = null;
        let previousSignificantValueIndex = -1;
        for (let idx = 0; idx < dataPoints.length; idx++) {
            const currentDataPointValue = dataPoints[idx];
            if (idx === 0) {
                if (currentDataPointValue != undefined) {
                    previousSignificantValue = currentDataPointValue;
                    previousSignificantValueIndex = idx;
                }
                continue;
            }
            let difference = null;
            if (currentDataPointValue != undefined && previousSignificantValue != undefined) {
                difference = currentDataPointValue - previousSignificantValue;
            }
            if (difference != undefined) {
                const indexDifference = idx - previousSignificantValueIndex;
                if (indexDifference > 1) {
                    result.push(difference / indexDifference);
                }
                else {
                    result.push(difference);
                }
            }
            else {
                result.push(null);
            }
            if (currentDataPointValue != undefined) {
                previousSignificantValue = currentDataPointValue;
                previousSignificantValueIndex = idx;
            }
        }
    }
    if (absValues || round) {
        for (let idx = 0; idx < result.length; idx++) {
            let value = result[idx];
            if (value != undefined) {
                if (absValues) {
                    value = Math.abs(value);
                }
                if (round) {
                    value = Math.round(value);
                }
                result[idx] = value;
            }
        }
    }
    return result;
};
exports.calculateValueDifferences = calculateValueDifferences;
/**
 * Maps an array of numbers to an array of differences between the numbers.
 * Each element can be number or null.
 * If previous element is null, the difference for current element equal to the last finite number divided corresponding element in `dataIntervalLengths` array.
 * @param {Array<number | null>} dataPoints Array of numbers or nulls
 * @param {Array<number | null>} dataIntervalLengths Array of numbers or nulls. Each element is the length of the interval for the corresponding element in dataPoints array.
 * @param {CalculateValueDifferencesWithVariableIntervalsOptions} options Options. Default: {absValues: false, round: false}
 * @return {Array<number | null>} Array of differences between the numbers. Size is one less than the input array.
 * @example calculateValueDifferences([3, 2, 1]) => [-1, -1]
 * @example calculateValueDifferences([4, 2, 2, 2, 1]) => [-2, 0, 0, -1]
 * @example calculateValueDifferences([2, null, 1, null]) => [null, -0.5, null]
 * @example calculateValueDifferences([2, null, 1, null], {absValues: true}) => [null, 0.5, null]
 * @example calculateValueDifferences([2, null, 1, null], {absValues: true, round: true}) => [null, 1, null]
 */
const calculateValueDifferencesWithVariableIntervals = (dataPoints, dataIntervalLengths, options) => {
    const { absValues = false, round = false, dataIntervalLengthMapper } = options || {};
    const result = [];
    if (dataPoints.length > 1 && dataPoints.length === dataIntervalLengths.length) {
        let previousSignificantValue = null;
        for (let idx = 0; idx < dataPoints.length; idx++) {
            const currentDataPointValue = dataPoints[idx];
            if (idx === 0) {
                if (currentDataPointValue != undefined) {
                    previousSignificantValue = currentDataPointValue;
                }
                continue;
            }
            let difference = null;
            if (currentDataPointValue != undefined && previousSignificantValue != undefined) {
                difference = currentDataPointValue - previousSignificantValue;
            }
            const dataIntervalLength = dataIntervalLengths[idx];
            if (difference != undefined && dataIntervalLength != undefined && dataIntervalLength > 0) {
                result.push(difference / options.dataIntervalLengthMapper(dataIntervalLength));
            }
            else {
                result.push(null);
            }
            if (currentDataPointValue != undefined) {
                previousSignificantValue = currentDataPointValue;
            }
        }
    }
    if (absValues || round) {
        for (let idx = 0; idx < result.length; idx++) {
            let value = result[idx];
            if (value != undefined) {
                if (absValues) {
                    value = Math.abs(value);
                }
                if (round) {
                    value = Math.round(value);
                }
                result[idx] = value;
            }
        }
    }
    return result;
};
exports.calculateValueDifferencesWithVariableIntervals = calculateValueDifferencesWithVariableIntervals;
/**
 * Calculates the difference between the last and the first positive value in the array. If there are no positive values, returns 0.
 * @param {Array<bigint>} dataPoints Array of bigints.
 * @return {bigint} difference
 * @example findDifferenceBetweenLastAndFirstPositiveValue([BigInt(3), BigInt(2), BigInt(1)]) => BigInt(-2)
 */
const findDifferenceBetweenLastAndFirstPositiveValue = (dataPoints) => {
    let firstValue = null;
    let lastValue = null;
    for (let idx = 0; idx < dataPoints.length; idx++) {
        const value = dataPoints[idx];
        if (value != undefined && value > BigInt(0)) {
            if (firstValue == null) {
                firstValue = value;
            }
            lastValue = value;
        }
    }
    if (firstValue != null && lastValue != null) {
        return lastValue - firstValue;
    }
    return BigInt(0);
};
exports.findDifferenceBetweenLastAndFirstPositiveValue = findDifferenceBetweenLastAndFirstPositiveValue;
//# sourceMappingURL=calculationNumberUtils.js.map