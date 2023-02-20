"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalUTCTimezoneOffset = exports.isToday = exports.getStartOfDayMillisecondsByShiftFromToday = exports.getMillisecondsFromStartOfDay = exports.getStartOfTodayMilliseconds = exports.getEndOfDayMilliseconds = exports.getStartOfDayMilliseconds = exports.getDifferenceBetweenMillis = exports.getHMSFromMillis = exports.fromNanosToMillis = void 0;
const dateConstants_1 = require("./dateConstants");
const dateUtils_1 = require("./dateUtils");
/**
 * Convert nanoseconds to milliseconds.
 * @param value The value in nanoseconds.
 * @return {number} The value in milliseconds.
 */
const fromNanosToMillis = (value) => Math.floor(Number(value) / dateConstants_1.NANOS_IN_MILLIS);
exports.fromNanosToMillis = fromNanosToMillis;
/**
 * Calculate length of time in milliseconds and present it in a human-readable format.
 * @param milliseconds The length of time in milliseconds.
 * @return {DateHMS} The length of time in human-readable format.
 */
const getHMSFromMillis = (milliseconds) => {
    const days = Math.floor(milliseconds / dateConstants_1.DAY_MILLIS);
    const millisFromDayStart = milliseconds % dateConstants_1.DAY_MILLIS;
    const secondsFromDayStart = millisFromDayStart / 1000;
    const hours = Math.floor(secondsFromDayStart / 3600);
    const minutes = Math.floor((secondsFromDayStart % 3600) / 60);
    const seconds = Math.floor(secondsFromDayStart % 60);
    const millisecondsFromSeconds = millisFromDayStart % 1000;
    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds: millisecondsFromSeconds,
        millisecondsTotal: milliseconds,
    };
};
exports.getHMSFromMillis = getHMSFromMillis;
/**
 * Calculate the difference between two dates in milliseconds and present it in a human-readable format.
 * Calculation is done using `getHMSFromMillis` function.
 * @param fromMillis The start date in milliseconds.
 * @param toMillis The end date in milliseconds.
 * @return {DateHMS} The difference in milliseconds.
 * @see getHMSFromMillis
 */
const getDifferenceBetweenMillis = (fromMillis, toMillis) => {
    const diffMilliseconds = toMillis - fromMillis;
    return (0, exports.getHMSFromMillis)(diffMilliseconds);
};
exports.getDifferenceBetweenMillis = getDifferenceBetweenMillis;
/**
 * Get the start of the day in milliseconds.
 * @param timeMillis The time in milliseconds.
 * @return {number} The start of the day in milliseconds.
 */
const getStartOfDayMilliseconds = (timeMillis) => timeMillis - (timeMillis % dateConstants_1.DAY_MILLIS);
exports.getStartOfDayMilliseconds = getStartOfDayMilliseconds;
/**
 * Get the end of the day in milliseconds.
 * @param timeMillis The time in milliseconds.
 * @return {number} The end of the day in milliseconds.
 */
const getEndOfDayMilliseconds = (timeMillis) => timeMillis - (timeMillis % dateConstants_1.DAY_MILLIS) + dateConstants_1.DAY_MILLIS - 1;
exports.getEndOfDayMilliseconds = getEndOfDayMilliseconds;
/**
 * Get the start of the today in milliseconds.
 * @return {number} The start of the today in milliseconds.
 */
const getStartOfTodayMilliseconds = () => (0, exports.getStartOfDayMilliseconds)((0, dateUtils_1.now)());
exports.getStartOfTodayMilliseconds = getStartOfTodayMilliseconds;
/**
 * Get milliseconds from the start of the day by the time in milliseconds.
 * @param timeMillis The time in milliseconds.
 */
const getMillisecondsFromStartOfDay = (timeMillis) => timeMillis % dateConstants_1.DAY_MILLIS;
exports.getMillisecondsFromStartOfDay = getMillisecondsFromStartOfDay;
/**
 * Get the start of the day in milliseconds by shift from today.
 * Shift is a number of days from today. Positive number means past, negative number means future.
 * @param shift The number of days from today. Value "1" means yesterday, value "7" means a week ago. Value "-1" means tomorrow, value "-7" means a week later.
 */
const getStartOfDayMillisecondsByShiftFromToday = (shift) => {
    const today = (0, exports.getStartOfTodayMilliseconds)();
    return today - shift * dateConstants_1.DAY_MILLIS;
};
exports.getStartOfDayMillisecondsByShiftFromToday = getStartOfDayMillisecondsByShiftFromToday;
/**
 * Check if the time is today.
 * @param timeMillis The time in milliseconds.
 */
const isToday = (timeMillis) => (0, exports.getStartOfDayMilliseconds)(timeMillis) == (0, exports.getStartOfTodayMilliseconds)();
exports.isToday = isToday;
/**
 * Return current UTC timezone.
 * Example: "+02:00" for Riga, Latvia.
 * @return {string} The current UTC timezone.
 * @see https://stackoverflow.com/questions/1091372/getting-the-clients-timezone-in-javascript
 */
const getLocalUTCTimezoneOffset = (date = new Date()) => {
    const offset = date.getTimezoneOffset();
    const sign = offset < 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0');
    const minutes = (Math.abs(offset) % 60).toString().padStart(2, '0');
    return `${sign}${hours}:${minutes}`;
};
exports.getLocalUTCTimezoneOffset = getLocalUTCTimezoneOffset;
//# sourceMappingURL=calculationDateUtils.js.map