/**
 * Sorter for antd table, which will put undefined and non-number values at the end of the list
 * @param {number | undefined | bigint} a
 * @param {number | undefined | bigint} b
 * @param {"ascend" | "descend" | null | undefined} order
 * @return {number} -1, 0, 1
 */
export declare const antdTableSorterWithNumberInTheBeginning: (a: number | undefined | bigint, b: number | undefined | bigint, order: "ascend" | "descend" | null | undefined) => 0 | 1 | -1;
/**
 * Number comparator, which will put undefined and non-number values at the end of the list
 * @param {number | undefined | bigint} a
 * @param {number | undefined | bigint} b
 * @param {"ascend" | "descend" | null | undefined} order
 * @return {number} -1, 0, 1
 */
export declare const numberComparatorWithNumberInTheBeginning: (a: number | undefined | bigint, b: number | undefined | bigint, order: "ascend" | "descend" | null | undefined) => 0 | 1 | -1;
export declare const booleanComparator: (a: boolean, b: boolean) => 0 | 1 | -1;
