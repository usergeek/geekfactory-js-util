"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booleanComparator = exports.numberComparatorWithNumberInTheBeginning = exports.antdTableSorterWithNumberInTheBeginning = void 0;
/**
 * Sorter for antd table, which will put undefined and non-number values at the end of the list
 * @param {number | undefined | bigint} a
 * @param {number | undefined | bigint} b
 * @param {"ascend" | "descend" | null | undefined} order
 * @return {number} -1, 0, 1
 */
const antdTableSorterWithNumberInTheBeginning = (a, b, order) => {
    const aNumber = Number(a);
    const bNumber = Number(b);
    if (aNumber === bNumber) {
        return 0;
    }
    if (a == undefined || !Number.isFinite(aNumber)) {
        return order === "ascend" ? 1 : -1;
    }
    if (b == undefined || !Number.isFinite(bNumber)) {
        return order === "ascend" ? -1 : 1;
    }
    return aNumber < bNumber ? -1 : 1;
};
exports.antdTableSorterWithNumberInTheBeginning = antdTableSorterWithNumberInTheBeginning;
/**
 * Number comparator, which will put undefined and non-number values at the end of the list
 * @param {number | undefined | bigint} a
 * @param {number | undefined | bigint} b
 * @param {"ascend" | "descend" | null | undefined} order
 * @return {number} -1, 0, 1
 */
const numberComparatorWithNumberInTheBeginning = (a, b, order) => {
    const aNumber = Number(a);
    const bNumber = Number(b);
    if (aNumber === bNumber) {
        return 0;
    }
    if (a == undefined || !Number.isFinite(aNumber)) {
        return 1;
    }
    if (b == undefined || !Number.isFinite(bNumber)) {
        return -1;
    }
    if (order == undefined || order === "ascend") {
        return aNumber < bNumber ? -1 : 1;
    }
    return aNumber < bNumber ? 1 : -1;
};
exports.numberComparatorWithNumberInTheBeginning = numberComparatorWithNumberInTheBeginning;
const booleanComparator = (a, b) => {
    if (a === b) {
        return 0;
    }
    return a ? 1 : -1;
};
exports.booleanComparator = booleanComparator;
//# sourceMappingURL=comparatorUtils.js.map