/**
 * Sums an array of numbers
 * @param array Array of numbers
 * @return {number} Sum of the array
 * @example sumArrayOfNumbers([1,2,3]) => 6
 * @example sumArrayOfNumbers(undefined) => 0
 */
export declare const sumArrayOfNumbers: (array: Array<number> | undefined) => number;
/**
 * Sums an array of BigInts
 * @param array Array of BigInts
 * @return {bigint} Sum of the array
 * @example sumArrayOfBigInts([BigInt(1),BigInt(2),BigInt(3)]) => BigInt(6)
 * @example sumArrayOfBigInts(undefined) => BigInt(0)
 */
export declare const sumArrayOfBigInts: (array: Array<bigint> | undefined) => bigint;
/**
 * Removes increases within an array of numbers
 * @param {Array<number | null>} array Array of numbers
 * @return {Array<number | null>} Array of numbers without increases
 * @example removeIncreases([4,5,3,1,5,2]) => [4,4,3,1,1,2]
 * @example removeIncreases([30, 40, 35]) => [30, 30, 25]
 */
export declare const removeValueIncreases: (array: Array<number | null>) => Array<number | null>;
export type CalculateValueDifferencesOptions = {
    absValues?: boolean;
    round?: boolean;
};
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
export declare const calculateValueDifferences: (dataPoints: Array<number | null>, options?: CalculateValueDifferencesOptions) => Array<number | null>;
export type CalculateValueDifferencesWithVariableIntervalsOptions = CalculateValueDifferencesOptions & {
    dataIntervalLengthMapper: (value: number) => number;
};
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
export declare const calculateValueDifferencesWithVariableIntervals: (dataPoints: Array<number | null>, dataIntervalLengths: Array<number | null>, options?: CalculateValueDifferencesWithVariableIntervalsOptions) => Array<number | null>;
/**
 * Calculates the difference between the last and the first positive value in the array. If there are no positive values, returns 0.
 * @param {Array<bigint>} dataPoints Array of bigints.
 * @return {bigint} difference
 * @example findDifferenceBetweenLastAndFirstPositiveValue([BigInt(3), BigInt(2), BigInt(1)]) => BigInt(-2)
 */
export declare const findDifferenceBetweenLastAndFirstPositiveValue: (dataPoints: Array<bigint>) => bigint;
