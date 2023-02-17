/**
 * Sorter for antd table, which will put undefined and non-number values at the end of the list
 * @param {number | undefined | bigint} a
 * @param {number | undefined | bigint} b
 * @param {"ascend" | "descend" | null | undefined} order
 * @return {number} -1, 0, 1
 */
export const antdTableSorterWithNumberInTheBeginning = (a: number | undefined | bigint, b: number | undefined | bigint, order: "ascend" | "descend" | null | undefined) => {
    const aNumber = Number(a);
    const bNumber = Number(b);
    if (aNumber === bNumber) {
        return 0;
    }
    if (a == undefined || !Number.isFinite(aNumber)) {
        return order === "ascend" ? 1 : -1
    }
    if (b == undefined || !Number.isFinite(bNumber)) {
        return order === "ascend" ? -1 : 1
    }
    return aNumber < bNumber ? -1 : 1;
}

/**
 * Number comparator, which will put undefined and non-number values at the end of the list
 * @param {number | undefined | bigint} a
 * @param {number | undefined | bigint} b
 * @param {"ascend" | "descend" | null | undefined} order
 * @return {number} -1, 0, 1
 */
export const numberComparatorWithNumberInTheBeginning = (a: number | undefined | bigint, b: number | undefined | bigint, order: "ascend" | "descend" | null | undefined) => {
    const aNumber = Number(a);
    const bNumber = Number(b);
    if (aNumber === bNumber) {
        return 0;
    }
    if (a == undefined || !Number.isFinite(aNumber)) {
        return 1
    }
    if (b == undefined || !Number.isFinite(bNumber)) {
        return -1
    }

    if (order == undefined || order === "ascend") {
        return aNumber < bNumber ? -1 : 1;
    }

    return aNumber < bNumber ? 1 : -1;
}

export const booleanComparator = (a: boolean, b: boolean) => {
    if (a === b) {
        return 0;
    }
    return a ? 1 : -1;
}