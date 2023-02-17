"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUTCDate = exports.now = void 0;
/**
 * Return the current time in milliseconds
 */
const now = () => new Date().getTime();
exports.now = now;
/**
 * Create a UTC date
 * @param {CreateUTCDateParameters} parameters. Default values: hour = 0, minute = 0, second = 0, millisecond = 0.
 * @returns {Date} UTC date
 * @example createUTCDate({year: 2022, month: 12, day: 29, hour: 6, minute: 54, second: 32, millisecond: 123}) => 1672296872123 / "2022-12-29T06:54:32.123Z"
 */
const createUTCDate = (parameters) => {
    const { year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0 } = parameters;
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    date.setUTCHours(hour, minute, second, millisecond);
    return date;
};
exports.createUTCDate = createUTCDate;
//# sourceMappingURL=dateUtils.js.map